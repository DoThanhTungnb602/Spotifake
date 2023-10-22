import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { AiOutlineClockCircle } from "react-icons/ai";
import { PlaylistListItem } from "./playlist-item";
import { IPlaylistTrack } from "@/type";

import { isSavedTracks } from "@/lib/track";

export function PlaylistList({
  tracks,
  id,
}: {
  tracks: IPlaylistTrack[];
  id: string;
}) {
  const [user] = useLocalStorage<string>("user");

  const checkSavedTracksQuery = useQuery({
    queryKey: ["check-saved-tracks", "playlist-tracks", id],
    queryFn: (): Promise<boolean[]> => {
      if (tracks.length > 50) {
        return Promise.all(
          Array.from({ length: Math.ceil(tracks.length / 50) }, (_, i) => {
            return isSavedTracks(
              tracks.slice(i * 50, (i + 1) * 50).map((track) => track.track.id),
            );
          }),
        ).then((res) => res.flat());
      }
      return isSavedTracks(tracks.map((track) => track.track.id));
    },
    enabled: !!user,
  });

  return (
    <table className="w-full">
      <thead>
        <tr className="top-16 h-9 border-b-[1px] text-text-blur">
          <th className="text-sm font-light w-[60px] text-center">#</th>
          <th className="text-start text-sm font-light">Title</th>
          <th className="text-start text-sm font-light">Album</th>
          <th className="text-start text-sm font-light">Release Date</th>
          <th className="text-sm font-light text-center flex justify-center items-center h-9">
            <AiOutlineClockCircle className="w-5 h-5 ml-2" />
          </th>
        </tr>
      </thead>
      <div className="pt-5"></div>
      <tbody>
        {tracks?.map((track, index) => (
          <PlaylistListItem
            key={track.track.id}
            track={track.track}
            index={index + 1}
            isSaved={checkSavedTracksQuery.data?.[index]}
          />
        ))}
      </tbody>
    </table>
  );
}
