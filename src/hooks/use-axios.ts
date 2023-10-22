import { ICredentials } from "@/type";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";

export function useAxios() {
  const [credentials] = useLocalStorage<ICredentials>("credentials");

  const axiosInstance = axios.create({
    baseURL: "https://api.spotify.com/v1",
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (credentials?.access_token) {
        config.headers.Authorization = `Bearer ${credentials.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
