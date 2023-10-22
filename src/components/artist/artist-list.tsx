import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { ArtistTopTracksItem } from "./artist-item";
import { ITrack } from "@/type";
import { isSavedTracks } from "@/lib/track";

export function ArtistTopTracksList({
  tracks,
  id,
}: {
  tracks: ITrack[];
  id: string;
}) {
  const [user] = useLocalStorage<string>("user");

  const checkSavedTracksQuery = useQuery({
    queryKey: ["check-saved-tracks", "artist-top-tracks", id],
    queryFn: (): Promise<boolean[]> => {
      return isSavedTracks(tracks.map((track) => track.id));
    },
    enabled: !!user,
  });

  return (
    <table className="w-full mb-5">
      <thead>
        <tr>
          <th className="w-14"></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => (
          <ArtistTopTracksItem
            key={index}
            index={index + 1}
            track={track}
            isSaved={checkSavedTracksQuery.data?.[index]}
          />
        ))}
      </tbody>
    </table>
  );
}
