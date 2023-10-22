import { Link } from "react-router-dom";
import { PlaylistCardSkeleton } from "./playlist/playlist-card-skeleton";
import { AlbumCardSkeleton } from "./album/album-card-skeleton";
import { ArtistCardSkeleton } from "./artist/artist-card-skeleton";

export function CardListSkeleton({
  title,
  url,
  type,
}: {
  title?: string;
  url: string;
  type?: "playlist" | "album" | "artist";
}) {
  return (
    <section className="w-full">
      <div className="flex justify-between mb-5 items-center">
        <div className="hover:underline transition text-2xl font-semibold">
          {title}
        </div>
        <div className="hover:underline transition text-sm font-semibold text-white/70">
          <Link to={url}>Show All</Link>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-x-5 overflow-hidden auto-rows-[0] grid-rows-1">
        {Array.from({ length: 6 }).map((_, index) => {
          if (type === "playlist") {
            return <PlaylistCardSkeleton key={index} />;
          } else if (type === "album") {
            return <AlbumCardSkeleton key={index} />;
          } else {
            return <ArtistCardSkeleton key={index} />;
          }
        })}
      </div>
    </section>
  );
}
