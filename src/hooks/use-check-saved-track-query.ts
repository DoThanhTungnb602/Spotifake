import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { isSavedTracks } from "@/lib/track";

export const useCheckSavedTracksQuery = (ids: string[]) => {
  const [user] = useLocalStorage("user");

  const checkSavedTrackQuery = useQuery({
    queryKey: ["check-saved-tracks", ids],
    queryFn: (): Promise<boolean[]> => isSavedTracks(ids),
    enabled: !!user && ids.some((id) => id),
  });

  return checkSavedTrackQuery;
};
