import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { ICredentials } from "@/type";

export const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const querySnapshot = await getDocs(collection(db, "credentials"));
    const { client_id, client_secret } = querySnapshot.docs[0].data();

    const credentials: ICredentials = JSON.parse(
      localStorage.getItem("credentials") || "{}",
    );
    const access_token = credentials?.access_token;
    const refresh_token = credentials?.refresh_token;
    const expires_in = credentials?.expires_in;

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    if (refresh_token && expires_in && Date.now() > expires_in) {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "refresh_token",
          refresh_token,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(client_id + ":" + client_secret),
          },
        },
      );
      const new_refresh_token = response.data.refresh_token || refresh_token;
      const newCredentials: ICredentials = {
        ...credentials,
        access_token: response.data.access_token,
        expires_in: Date.now() + response.data.expires_in * 1000,
        refresh_token: new_refresh_token,
      };
      localStorage.setItem("credentials", JSON.stringify(newCredentials));
      config.headers.Authorization = `Bearer ${response.data.access_token}`;
    }

    if (
      !access_token ||
      (!refresh_token && expires_in && Date.now() > expires_in)
    ) {
      const response = await axios.post(
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
      );
      const newCredentials: ICredentials = {
        ...credentials,
        token_type: response.data.token_type,
        access_token: response.data.access_token,
        expires_in: Date.now() + response.data.expires_in * 1000,
      };
      localStorage.setItem("credentials", JSON.stringify(newCredentials));
      config.headers.Authorization = `Bearer ${response.data.access_token}`;
    }
  } catch (error) {
    console.log(error);
  }

  return config;
});
