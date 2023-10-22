import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Link } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { BtnPlay } from "@/components/btn-play";

import { PlaylistError } from "@/components/playlist/playlist-error";

import { IUser, IUserSavedTracks } from "@/type";
import { getUserSavedTracks } from "@/lib/track";
import { SavedTracksList } from "./user-saved-tracks-list";

export default function UserSavedTracks() {
  const [user] = useLocalStorage<IUser>("user");

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-saved-tracks"],
    queryFn: (): Promise<IUserSavedTracks> => getUserSavedTracks(),
    enabled: !!user,
  });

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-[800px]">
          <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake" />
        </div>
      )}
      {error && <PlaylistError />}
      {data && (
        <div className="flex flex-col">
          <div className="flex h-[350px] bg-gradient-to-r from-cyan-500 to-blue-500 pt-24 px-6 gap-8">
            <div className="w-[230px] h-[230px] shadow-lg shadow-gray-800">
              <img src="https://misc.scdn.co/liked-songs/liked-songs-300.png" />
            </div>
            <div>
              <p className="mb-3 mt-3">Playlist</p>
              <h2 className="text-7xl font-bold mb-5 line-clamp-1 leading-snug">
                Loved Songs
              </h2>
              <div className="flex items-center text-sm">
                <Link
                  to={`/user/${user.id}`}
                  className="text-white/60 hover:text-white flex items-center group mr-2"
                >
                  <span className="text-white group-hover:underline transition">
                    {user.display_name}
                  </span>
                </Link>
                <p className="ml-2">{data?.total} songs</p>
              </div>
            </div>
          </div>

          <div className="flex h-[104px]">
            <div className="flex gap-5 items-center p-6">
              {data.href && <BtnPlay uri={data.href} />}
            </div>
          </div>

          <div className="flex px-6">
            {data?.items && <SavedTracksList tracks={data?.items} />}
          </div>
        </div>
      )}
    </>
  );
}
