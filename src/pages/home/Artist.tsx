import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { BtnPlay } from "@/components/btn-play";
import { MoreActions } from "@/components/more-actions";
import { ArtistTopTracksList } from "@/components/artist/artist-list";
import { CardList } from "@/components/card-list";
import { ArtistError } from "@/components/artist/artist-error";

import { BiLoaderAlt } from "react-icons/bi";
import { MdVerified } from "react-icons/md";

import { ITrack } from "@/type";
import { getArtistTopTracks } from "@/lib/artist";
import { BtnFollowArtist } from "@/components/artist/btn-follow-artist.tsx";
import { useArtistQuery } from "@/hooks/use-artist-query";
import { useArtistAlbumsQuery } from "@/hooks/use-artist-albums-query";

export default function Artist() {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };

  const artistQuery = useArtistQuery(artistId);

  const artistAlbumsQuery = useArtistAlbumsQuery(artistId, 6, "artist page");

  const artistTopTracksQuery = useQuery({
    queryKey: ["artist-top-tracks", artistId],
    queryFn: (): Promise<ITrack[]> => getArtistTopTracks(artistId),
  });

  return (
    <div className="flex flex-col">
      {artistQuery.isLoading ? (
        <div className="flex items-center justify-center h-[800px]">
          <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake" />
        </div>
      ) : artistQuery.error ? (
        <ArtistError />
      ) : (
        <>
          <div className="flex h-[400px] pt-24 px-6 gap-8 relative">
            <div
              className="bg-fixed bg-bottom bg-cover opacity-60 absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `url("${artistQuery.data?.images[0].url}")`,
              }}
            />
            <div className="absolute">
              <div className="mb-6 mt-10 flex items-center">
                <MdVerified className="inline-block mr-1 w-7 h-7 text-[#3D91F4]" />
                Verified Artist
              </div>
              <h2 className="text-8xl font-bold mb-16">
                {artistQuery.data?.name}
              </h2>
              <p>
                {artistQuery.data?.followers.total.toLocaleString()}
                &nbsp; monthly listeners
              </p>
            </div>
          </div>

          <div className="flex h-[104px]">
            <div className="flex gap-5 items-center p-6">
              {artistId && (
                <>
                  <BtnPlay uri={artistQuery.data?.uri as string} />
                  <BtnFollowArtist id={artistId} view="artist page" />
                  <MoreActions />
                </>
              )}
            </div>
          </div>

          <div className="flex px-6 flex-col gap-7">
            <p className="text-2xl font-bold">Popular</p>
            {artistTopTracksQuery.isLoading ? (
              <p className="text-white">Loading...</p>
            ) : (
              artistTopTracksQuery.data && (
                <ArtistTopTracksList
                  tracks={artistTopTracksQuery.data}
                  id={artistId}
                />
              )
            )}
            {artistAlbumsQuery.isLoading ? (
              <p className="text-white">Loading...</p>
            ) : (
              artistAlbumsQuery.data?.items && (
                <CardList
                  title="Albums"
                  url={`/artist/albums/${artistId}`}
                  data={artistAlbumsQuery.data?.items}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
