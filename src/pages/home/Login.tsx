import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

import axios from "axios";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import { BsSpotify } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";

import { ICredentials, IUser } from "@/type";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, saveUser] = useLocalStorage<IUser>("user");
  const [, saveCredentials] = useLocalStorage<ICredentials>("credentials");

  useEffect(() => {
    if (user) navigate("/");

    const code = searchParams.get("code");

    if (!code) {
      navigate("/");
    } else {
      getDocs(collection(db, "credentials"))
        .then((querySnapshot) => {
          const { client_id, client_secret, redirect_uri } =
            querySnapshot.docs[0].data();
          console.log("Get credentials success");
          axios
            .post(
              "https://accounts.spotify.com/api/token",
              {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirect_uri,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization:
                    "Basic " + btoa(client_id + ":" + client_secret),
                },
              },
            )
            .then((res) => {
              console.log("Get auth code success");
              saveCredentials({
                access_token: res.data?.access_token,
                scope: res.data?.scope,
                token_type: res.data?.token_type,
                expires_in: res.data?.expires_in * 1000 + Date.now(),
                refresh_token: res.data?.refresh_token,
              });
              axios
                .get("https://api.spotify.com/v1/me", {
                  headers: {
                    Authorization: "Bearer " + res.data?.access_token,
                  },
                })
                .then((res) => {
                  saveUser(res.data);
                })
                .catch((error) => {
                  console.log("Get user error", error);
                });
            })
            .catch((error) => {
              console.log("Get auth code error", error);
            });
        })
        .catch((error) => {
          console.log("Get credentials error", error);
        })
        .finally(() => {
          navigate("/");
        });
    }
  });

  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col gap-5 bg-black">
      <BsSpotify className="text-7xl text-spotifake" />
      <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake mt-5" />
      <h1 className="text-4xl font-bold">Logging in, please wait...</h1>
    </div>
  );
}
