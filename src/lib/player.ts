import { axiosInstance } from "./axios";
import { IDevices, IPlaybackState, IQueue, IRepeatState } from "@/type";
import { toast } from "sonner";

export function getPlaybackState(): Promise<IPlaybackState> {
  const url = "/me/player?market=VN";
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get playback state error: ", error);
    });
}

export function getQueue(): Promise<IQueue> {
  const url = "/me/player/queue";
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get queue error: ", error);
    });
}

export function getDevices(): Promise<IDevices> {
  const url = "/me/player/devices";
  return axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Get devices error: ", error.response);
    });
}

export function transferPlayback(deviceId: string) {
  const url = "/me/player";
  return axiosInstance
    .put(
      url,
      {
        device_ids: [deviceId],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .catch((error) => toast.error(error.response.data.error.message));
}

export function pausePlayback(deviceId?: string) {
  const url = "/me/player/pause";
  return axiosInstance
    .put(url, {
      device_id: deviceId,
    })
    .catch((error) => toast.error(error.response.data.error.message));
}

export function startPlayback(
  deviceId?: string,
  context_uri?: string,
  offset?: {
    position?: number;
  },
  position_ms: number = 0,
) {
  const url = deviceId
    ? `/me/player/play?device_id=${deviceId}`
    : "/me/player/play";
  return axiosInstance
    .put(
      url,
      {
        position_ms,
        context_uri,
        offset,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .catch((error) => toast.error(error.response.data.error.message));
}

export function skipToNext(deviceId?: string) {
  const url = deviceId
    ? `/me/player/next?device_id=${deviceId}`
    : "/me/player/next";
  return axiosInstance
    .post(url)
    .catch((error) => toast.error(error.response.data.error.message));
}

export function skipToPrevious(deviceId?: string) {
  const url = deviceId
    ? `/me/player/previous?device_id=${deviceId}`
    : "/me/player/previous";
  return axiosInstance
    .post(url)
    .catch((error) => toast.error(error.response.data.error.message));
}

export function togglePlaybackShuffle(state: boolean, deviceId?: string) {
  const url = deviceId
    ? `/me/player/shuffle?state=${state}&device_id=${deviceId}`
    : `/me/player/shuffle?state=${state}`;
  return axiosInstance
    .put(url)
    .catch((error) => toast.error(error.response.data.error.message));
}

export function setRepeatMode(state: IRepeatState, deviceId?: string) {
  const url = deviceId
    ? `/me/player/repeat?state=${state}&device_id=${deviceId}`
    : `/me/player/repeat?state=${state}`;
  return axiosInstance
    .put(url)
    .catch((error) => toast.error(error.response.data.error.message));
}

export async function setPlaybackVolume(volume?: number, deviceId?: string) {
  if (!volume) return;
  const url = deviceId
    ? `/me/player/volume?volume_percent=${volume}&device_id=${deviceId}`
    : `/me/player/volume?volume_percent=${volume}`;
  return axiosInstance
    .put(url)
    .catch((error) =>
      toast.error(
        "Set playback volume error: " + error.response.data.error.message,
      ),
    );
}

export async function seekToPosition(position?: number, deviceId?: string) {
  if (!position) return;
  const url = deviceId
    ? `/me/player/seek?position_ms=${position}&device_id=${deviceId}`
    : `/me/player/seek?position_ms=${position}`;
  return axiosInstance
    .put(url)
    .catch((error) => toast.error(error.response.data.error.message));
}
