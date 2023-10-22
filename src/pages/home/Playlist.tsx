import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

import parse from "html-react-parser";

import { BsSpotify } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";
import { BtnPlay } from "@/components/btn-play";
import { MoreActions } from "@/components/more-actions";
import { PlaylistList } from "@/components/playlist/playlist-list";

import { IPlaylist } from "@/type";
import { PlaylistError } from "@/components/playlist/playlist-error";

import { millisecondsToHoursAndMinutes } from "@/lib/milliseconds-convert";
import { getPlaylist } from "@/lib/playlist";
import { BtnFollowPlaylist } from "@/components/playlist/btn-follow-playlist.tsx";

export default function Playlist() {
  const { playlistId } = useParams<{ playlistId: string }>() as {
    playlistId: string;
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: (): Promise<IPlaylist> => getPlaylist(playlistId),
  });

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center h-[800px]">
          <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake" />
        </div>
      ) : error ? (
        <PlaylistError />
      ) : (
        <>
          <div className="flex h-[350px] bg-gradient-to-r from-cyan-500 to-blue-500 pt-24 px-6 gap-8">
            <div className="w-[230px] h-[230px] shadow-lg shadow-gray-800">
              <img
                src={data?.images[0].url}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="mb-3 mt-3">Playlist</p>
              <h2 className="text-7xl font-bold mb-5 line-clamp-1 leading-snug">
                {data?.name}
              </h2>
              <p className="text-sm mb-2">
                {parse(data?.description as string)}
              </p>
              <div className="flex items-center text-sm">
                <Link
                  to={`/user/${data?.owner.id}`}
                  className="text-white/60 hover:text-white flex items-center group mr-2"
                >
                  <BsSpotify className="w-7 h-7 mr-2 text-spotifake bg-black rounded-full" />
                  <span className="text-white group-hover:underline transition">
                    {data?.owner.display_name}
                  </span>
                </Link>
                {data?.followers.total !== 0 && (
                  <>
                    &bull;
                    <p className="mx-2">
                      {data?.followers.total.toLocaleString()} likes
                    </p>
                  </>
                )}
                &bull;
                <p className="ml-2">
                  {data?.tracks.total} songs, about{" "}
                  {millisecondsToHoursAndMinutes(
                    data?.tracks?.items.reduce(
                      (acc, cur) => acc + cur?.track?.duration_ms,
                      0,
                    ) || 0,
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-[104px]">
            <div className="flex gap-5 items-center p-6">
              {playlistId && (
                <>
                  <BtnPlay uri={data?.uri || ""} />
                  <BtnFollowPlaylist id={playlistId} />
                  <MoreActions />
                </>
              )}
            </div>
          </div>

          <div className="flex px-6">
            {data?.tracks && (
              <PlaylistList tracks={data?.tracks.items} id={playlistId} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
