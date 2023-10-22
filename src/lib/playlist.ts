import { axiosInstance } from "./axios";
import { toast } from "sonner";

export async function getUserPlaylists(limit?: number) {
  const url = limit ? `/me/playlists?limit=${limit}` : `/me/playlists`;
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get user playlists error: ", error);
    });
}

export function followPlaylist(playlistId: string) {
  return axiosInstance
    .put(
      `/playlists/${playlistId}/followers`,
      {
        public: false,
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

export function unfollowPlaylist(playlistId: string) {
  const url = `/playlists/${playlistId}/followers`;
  return axiosInstance.delete(url).catch((error) => {
    toast.error(error.response.data.error.message);
  });
}

export function isFollowingPlaylist(
  playlistId: string,
  userId: string,
): Promise<boolean> {
  const url = `/playlists/${playlistId}/followers/contains?ids=${userId}`;
  return axiosInstance
    .get(url)
    .then((res) => res.data[0])
    .catch((error) => {
      console.log("Is following playlist error: ", error);
    });
}

export async function getPlaylist(playlistId: string) {
  return axiosInstance
    .get(`/playlists/${playlistId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get playlist error: ", error.response.data.error.message);
    });
}

export function getFeaturedPlaylists(limit: number) {
  const url = limit
    ? `/browse/featured-playlists?limit=${limit}`
    : `/browse/featured-playlists`;
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get featured playlists error: ", error);
    });
}
