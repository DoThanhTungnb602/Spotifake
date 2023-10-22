import { axiosInstance } from "./axios";
import { IUserSavedTracks } from "@/type";
import { toast } from "sonner";

export function getTrack(trackId: string) {
  const url = `/tracks/${trackId}`;
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get track error: ", error);
    });
}

export function getUserSavedTracks(limit?: number): Promise<IUserSavedTracks> {
  const url = limit ? `/me/tracks?limit=${limit}` : `/me/tracks`;
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get user saved tracks error: ", error);
    });
}

export function saveTrack(id: string) {
  const url = `/me/tracks`;
  return axiosInstance
    .put(
      url,
      {
        ids: [id],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .catch((error) => {
      toast.error(error.response.data.error.message);
    });
}

export function removeTrack(id: string) {
  const url = `/me/tracks?ids=${id}`;
  return axiosInstance
    .delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      toast.error(error.response.data.error.message);
    });
}

export function isSavedTracks(ids: string[]): Promise<boolean[]> {
  const url = `/me/tracks/contains?ids=${ids.join(",")}`;
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Check user saved track error: ", error);
    });
}
