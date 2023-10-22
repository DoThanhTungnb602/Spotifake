import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

import axios from "axios";
import { ICredentials, IUser } from "@/type";

export function useAccessToken() {
  const [credentials, setCredentials] =
    useLocalStorage<ICredentials>("credentials");
  const [user, setUser] = useLocalStorage<IUser | null>("user");
  const { client_id, client_secret } = useCredentials();
  const [token, setToken] = useState(credentials?.access_token || "");

  useEffect(() => {
    console.log(credentials);
    const isTokenExpired =
      credentials?.expires_in && credentials?.expires_in < Date.now();
    const isLogin = !!user;
    if (!isLogin && !credentials) {
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          {
            grant_type: "client_credentials",
            client_id,
            client_secret,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        )
        .then((res) => {
          console.log("token: ", res.data.access_token);
          setCredentials({
            access_token: res.data.access_token,
            expires_in: res.data?.expires_in * 1000 + Date.now(),
            token_type: res.data.token_type,
          });
          setToken(res.data.access_token);
        })
        .catch((error) => {
          console.log("Get access token error: ", error);
        });
    }
    if (isLogin && isTokenExpired) {
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          {
            grant_type: "refresh_token",
            refresh_token: credentials.refresh_token,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Basic " + btoa(client_id + ":" + client_secret),
            },
          },
        )
        .then((res) => {
          setCredentials({
            ...credentials,
            access_token: res.data.access_token,
            expires_in: res.data?.expires_in * 1000 + Date.now(),
            scope: res.data.scope,
            token_type: res.data.token_type,
          });
          setToken(res.data.access_token);
        })
        .catch((error) => {
          console.log("Refresh token error: ", error);
          setUser(null);
          setCredentials(null!);
          redirect("/");
        });
    }
  }, []);

  return token;
}
