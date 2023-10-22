import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { getPlaybackState } from "@/lib/player";
import { IPlaybackState } from "@/type";

export const usePlaybackState = () => {
  const [user] = useLocalStorage("user");

  const playbackStateQuery = useQuery({
    queryKey: ["playback-state"],
    queryFn: (): Promise<IPlaybackState> => getPlaybackState(),
    enabled: !!user,
    refetchInterval: 1000,
  });

  return playbackStateQuery;
};
