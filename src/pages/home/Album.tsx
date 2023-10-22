import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

import { BsSpotify } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";

import { BtnPlay } from "@/components/btn-play";
import { MoreActions } from "@/components/more-actions";
import { AlbumList } from "@/components/album/album-list";
import { IAlbum } from "@/type";
import { AlbumError } from "@/components/album/album-error";
import { millisecondsToHoursAndMinutes } from "@/lib/milliseconds-convert";
import { getAlbum } from "@/lib/album";
import { BtnSaveAlbum } from "@/components/album/btn-save-album.tsx";

export default function Album() {
  const { albumId } = useParams<{ albumId: string }>() as { albumId: string };

  const { isLoading, data, error } = useQuery({
    queryKey: ["album", albumId],
    queryFn: (): Promise<IAlbum> => getAlbum(albumId),
    enabled: !!albumId,
  });

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center h-[800px]">
          <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake" />
        </div>
      ) : error ? (
        <AlbumError />
      ) : (
        data && (
          <>
            <div className="flex h-[350px] bg-gradient-to-r from-cyan-500 to-blue-500 pt-24 px-6 gap-8">
              <div className="w-[230px] h-[230px]">
                <img
                  src={data.images[0].url}
                  className="object-cover w-full aspect-square shadow-lg shadow-gray-800"
                />
              </div>
              <div>
                <p className="mb-3 mt-3">Album</p>
                <h2 className="text-7xl font-bold mb-10 line-clamp-1">
                  {data.name}
                </h2>
                <div className="flex items-center text-sm">
                  <Link
                    to="/"
                    className="text-white/60 hover:text-white flex items-center group mr-2"
                  >
                    <BsSpotify className="w-7 h-7 mr-2 text-spotifake bg-black rounded-full" />
                    <span className="text-white group-hover:underline transition">
                      {data.artists.map((artist) => artist.name).join(", ")}
                    </span>
                  </Link>
                  &bull;
                  <p className="mx-2">
                    {new Date(data.release_date).getFullYear()}
                  </p>
                  &bull;
                  <p className="ml-2">
                    {data.total_tracks} songs,{" "}
                    {millisecondsToHoursAndMinutes(
                      data.tracks.items.reduce((acc, curr) => {
                        return acc + curr.duration_ms;
                      }, 0),
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-[104px]">
              <div className="flex gap-5 items-center p-6">
                {albumId && (
                  <>
                    <BtnPlay uri={data.uri} />
                    <BtnSaveAlbum id={albumId} />
                    <MoreActions />
                  </>
                )}
              </div>
            </div>

            <div className="flex px-6">
              <AlbumList tracks={data.tracks.items} id={albumId} />
            </div>
          </>
        )
      )}
    </div>
  );
}
