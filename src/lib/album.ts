import { toast } from "sonner";
import { axiosInstance } from "./axios";

export async function getUserSavedAlbums(limit?: number) {
  const url = limit ? `/me/albums?limit=${limit}` : "/me/albums";
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log("Get user saved albums error: ", error);
  }
}

export async function saveAlbum(id: string) {
  const url = `/me/albums`;
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

export function removeAlbum(id: string) {
  const url = `/me/albums?ids=${id}`;
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

export function isSavedAlbum(id: string): Promise<boolean> {
  const url = `/me/albums/contains?ids=${id}`;
  return axiosInstance
    .get(url)
    .then((res) => res.data[0])
    .catch((error) => {
      console.log("Is saved albums error: ", error);
    });
}

export function getAlbum(id: string) {
  const url = `/albums/${id}`;
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get album error: ", error);
    });
}
