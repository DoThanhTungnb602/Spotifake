import { Link } from "react-router-dom";

import { ArtistCard } from "@/components/artist/artist-card";
import { PlaylistCard } from "@/components/playlist/playlist-card";
import { AlbumCard } from "@/components/album/album-card";

import {
  ISimplifiedPlaylist,
  IArtist,
  ISimplifiedAlbum,
  ISavedAlbum,
} from "@/type";
import { extractIdFromUrl } from "@/lib/extract-id-from-url";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  url?: string;
  isLoading?: boolean;
  data: ISimplifiedPlaylist[] | ISimplifiedAlbum[] | IArtist[] | ISavedAlbum[];
};

export function CardList({ title, url, isLoading, data }: Props) {
  if (data.length > 0) {
    return (
      <section className="w-full">
        {url && (
          <div className="flex justify-between mb-5 items-center">
            <Link
              to={url}
              className="hover:underline transition text-2xl font-semibold"
            >
              {title}
            </Link>
            <Link
              to={url}
              className="hover:underline transition text-sm font-semibold text-white/70"
            >
              Show all
            </Link>
          </div>
        )}
        <div
          className={cn(
            "grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-x-5",
            url ? "overflow-hidden auto-rows-[0] grid-rows-1" : "gap-y-5",
          )}
        >
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : (
            data.map((item, index) => {
              if ("added_at" in item) {
                return (
                  <AlbumCard
                    key={index}
                    url={`/album/${extractIdFromUrl(
                      item?.album.external_urls.spotify,
                    )}`}
                    uri={item?.album.uri}
                    imageUrl={item?.album.images[0].url}
                    title={item?.album.name}
                    releaseDate={item?.album.release_date}
                  />
                );
              } else if (item.type === "artist") {
                return (
                  <ArtistCard
                    key={index}
                    url={`/artist/${extractIdFromUrl(
                      item.external_urls.spotify,
                    )}`}
                    uri={item.uri}
                    name={item.name}
                    imageUrl={item.images[0].url}
                  />
                );
              } else if (item.type === "album") {
                return (
                  <AlbumCard
                    uri={item.uri}
                    key={index}
                    url={`/album/${extractIdFromUrl(
                      item.external_urls.spotify,
                    )}`}
                    imageUrl={item.images[0].url}
                    title={item.name}
                    releaseDate={item.release_date}
                  />
                );
              } else if (item.type === "playlist") {
                return (
                  <PlaylistCard
                    key={index}
                    url={`/playlist/${extractIdFromUrl(
                      item.external_urls.spotify,
                    )}`}
                    uri={item.uri}
                    imageUrl={item.images[0].url}
                    title={item.name}
                    description={item.description}
                  />
                );
              } else {
                return null;
              }
            })
          )}
        </div>
      </section>
    );
  } else {
    return null;
  }
}
