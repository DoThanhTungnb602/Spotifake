import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { AiOutlineClockCircle } from "react-icons/ai";
import { AlbumItem } from "./album-item";
import { ISimplifiedTrack } from "@/type";
import { isSavedTracks } from "@/lib/track";

export function AlbumList({
  tracks,
  id,
}: {
  tracks: ISimplifiedTrack[];
  id: string;
}) {
  const [user] = useLocalStorage<string>("user");

  const checkSavedTracksQuery = useQuery({
    queryKey: ["check-saved-tracks", "album-tracks", id],
    queryFn: (): Promise<boolean[]> =>
      isSavedTracks(tracks.map((track) => track.id)),
    enabled: !!user,
  });

  return (
    <table className="w-full">
      <thead>
        <tr className="top-16 h-9 border-b-[1px] text-text-blur">
          <th className="text-sm font-light w-[60px] text-center">#</th>
          <th className="text-start text-sm font-light">Title</th>
          <th className="text-sm font-light text-center flex justify-center items-center h-9">
            <AiOutlineClockCircle className="w-5 h-5 ml-2" />
          </th>
        </tr>
      </thead>
      <div className="pt-5"></div>
      <tbody>
        {tracks.map((track, index) => (
          <AlbumItem
            key={track.id}
            index={index + 1}
            track={track}
            isSaved={checkSavedTracksQuery.data?.[index]}
          />
        ))}
      </tbody>
    </table>
  );
}
