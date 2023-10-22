import { axiosInstance } from "./axios";
import { toast } from "sonner";

export function getFollowedArtists(limit?: number) {
  const url = limit
    ? `/me/following?type=artist&limit=${limit}`
    : `/me/following?type=artist`;
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get followed artists error: ", error);
    });
}

export function getArtist(artistId: string) {
  return axiosInstance
    .get(`/artists/${artistId}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get artist error: ", error);
    });
}

export function getArtistTopTracks(artistId: string) {
  return axiosInstance
    .get(`/artists/${artistId}/top-tracks?market=VN`)
    .then((res) => res.data.tracks)
    .catch((error) => {
      console.log("Get artist top tracks error: ", error);
    });
}

export function getArtistAlbums(artistId: string, limit?: number) {
  const url = limit
    ? `/artists/${artistId}/albums?limit=${limit}`
    : `/artists/${artistId}/albums`;
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get artist albums error: ", error);
    });
}

export function followArtist(id: string) {
  const url = `/me/following?type=artist`;
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

export function unfollowArtist(id: string) {
  const url = `/me/following?type=artist&ids=${id}`;
  return axiosInstance.delete(url).catch((error) => {
    toast.error(error.response.data.error.message);
  });
}

export function isFollowingArtist(id: string) {
  const url = `/me/following/contains?type=artist&ids=${id}`;
  return axiosInstance
    .get(url)
    .then((res) => res.data[0])
    .catch((error) => {
      console.log("Check following artist error: ", error);
    });
}
