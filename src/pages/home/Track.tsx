import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

import { BiLoaderAlt } from "react-icons/bi";

import { BtnPlay } from "@/components/btn-play";
import { MoreActions } from "@/components/more-actions";
import { IAlbum, IArtist, ISimplifiedTrack, ITrack } from "@/type";
import { millisecondsToMinutesAndSeconds } from "@/lib/milliseconds-convert";
import { getTrack } from "@/lib/track";
import { BtnSaveTrack } from "@/components/track/btn-save-track.tsx";
import { useCheckSavedTracksQuery } from "@/hooks/use-check-saved-track-query";
import { getArtist, getArtistTopTracks } from "@/lib/artist";
import { ArtistTopTracksList } from "@/components/artist/artist-list";
import { AlbumList } from "@/components/album/album-list";
import { getAlbum } from "@/lib/album";
import { TrackError } from "@/components/track/track-error";

export default function Track() {
  const { trackId } = useParams<{ trackId: string }>() as { trackId: string };

  const { isLoading, data, error } = useQuery({
    queryKey: ["track", trackId],
    queryFn: (): Promise<ITrack> => getTrack(trackId),
    enabled: !!trackId,
  });

  const checkSavedTrackQuery = useCheckSavedTracksQuery([trackId]);

  const trackArtistsQuery = useQuery({
    queryKey: ["track-artists", data?.artists[0].id],
    queryFn: (): Promise<IArtist[]> => {
      if (!data) return Promise.resolve([]);
      return Promise.all(data.artists.map((artist) => getArtist(artist.id)));
    },
    enabled: !!data,
  });

  const artistTopTracksQuery = useQuery({
    queryKey: ["artist-top-tracks", data?.artists[0].id],
    queryFn: (): Promise<ITrack[]> =>
      getArtistTopTracks(data?.artists[0].id as string),
    enabled: !!data,
  });

  const trackAlbumQuery = useQuery({
    queryKey: ["album", data?.album.id],
    queryFn: (): Promise<IAlbum> => getAlbum(data?.album.id as string),
    enabled: !!data?.album.id,
  });

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center h-[800px]">
          <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake" />
        </div>
      ) : error ? (
        <TrackError />
      ) : (
        data && (
          <>
            <div className="flex bg-gradient-to-r from-cyan-500 to-blue-500 pt-24 px-6 gap-8 pb-10">
              <div className="w-[230px] h-[230px] shrink-0">
                <img
                  src={data.album.images[0].url}
                  className="object-cover w-full h-full aspect-square shadow-lg shadow-gray-800"
                />
              </div>
              <div className="self-end">
                <p className="mb-3 mt-3">Song</p>
                <h2 className="text-4xl font-bold mb-10 line-clamp-2">
                  {data.name}
                </h2>
                <div className="flex items-center text-sm gap-1">
                  <Link
                    to={`/artist/${data.artists[0].id}`}
                    className="text-white/60 hover:text-white flex items-center group"
                  >
                    <img
                      src={
                        trackArtistsQuery.data?.find(
                          (artist) => artist.id === data.artists[0].id
                        )?.images[0].url
                      }
                      className="w-8 h-8 mr-2 rounded-full object-cover"
                    />
                    <span className="text-white group-hover:underline transition">
                      {data.artists[0].name}
                    </span>
                  </Link>
                  &bull;
                  <Link
                    to={`/album/${data.album.id}`}
                    className="text-white/60 hover:text-white flex items-center group"
                  >
                    <span className="text-white group-hover:underline transition">
                      {data.album.name}
                    </span>
                  </Link>
                  &bull;
                  <p>{new Date(data.album.release_date).getFullYear()}</p>
                  &bull;
                  <p>{millisecondsToMinutesAndSeconds(data.duration_ms)}</p>
                </div>
              </div>
            </div>

            <div className="flex h-[104px]">
              <div className="flex gap-5 items-center p-6">
                {trackId && (
                  <>
                    <BtnPlay uri={data.uri} />
                    <BtnSaveTrack
                      size="lg"
                      id={trackId}
                      isSaved={
                        checkSavedTrackQuery.data !== undefined
                          ? checkSavedTrackQuery.data[0]
                          : false
                      }
                    />
                    <MoreActions />
                  </>
                )}
              </div>
            </div>

            <div className="flex px-6 flex-col gap-5">
              {data.artists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className="flex items-center gap-2 hover:bg-[#2A2A2A] p-2 rounded-md transition"
                >
                  <img
                    src={
                      trackArtistsQuery.data?.find(
                        (_artist) => _artist.id === artist.id
                      )?.images[0].url
                    }
                    className="w-20 h-20 mr-2 rounded-full object-cover"
                  />
                  <div>
                    <p>Artist</p>
                    <span className="text-white hover:underline transition font-semibold">
                      {artist.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="p-6">
              <p className="text-white/70 text-sm">Popular Tracks by</p>
              <p className="text-2xl font-semibold mb-5">
                {data.artists[0].name}
              </p>
              {artistTopTracksQuery.isLoading ? (
                <p className="text-white">Loading...</p>
              ) : (
                artistTopTracksQuery.data && (
                  <ArtistTopTracksList
                    tracks={artistTopTracksQuery.data}
                    id={data?.artists[0].id as string}
                  />
                )
              )}
            </div>

            <div className="px-6">
              <Link
                to={`/album/${data.album.id}`}
                className="flex items-center gap-2 hover:bg-[#2A2A2A] p-2 rounded-md transition"
              >
                <img
                  src={data.album.images[0].url}
                  className="w-20 h-20 mr-2 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm">From the album</p>
                  <span className="text-white hover:underline transition font-semibold text-lg">
                    {data.album.name}
                  </span>
                </div>
              </Link>
              {trackAlbumQuery.isLoading ? (
                <p className="text-white">Loading...</p>
              ) : (
                <AlbumList
                  tracks={
                    trackAlbumQuery.data?.tracks.items as ISimplifiedTrack[]
                  }
                  id={data.album.id}
                />
              )}
            </div>
          </>
        )
      )}
    </div>
  );
}
