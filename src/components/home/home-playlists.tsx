import { useQuery } from "@tanstack/react-query";

import HomePlaylistItem from "./home-playlists-item";
import { IFeaturedPlaylists } from "@/type";

import { extractIdFromUrl } from "@/lib/extract-id-from-url";
import { getFeaturedPlaylists } from "@/lib/playlist";
import { HomePlaylistSkeleton } from "./home-playlist-skeleton";

export default function HomePlaylist() {
  const { isLoading, data } = useQuery({
    queryKey: ["featured-playlists"],
    queryFn: (): Promise<IFeaturedPlaylists> => getFeaturedPlaylists(6),
  });

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8">Featured Playlists</h2>
      <div className="grid grid-rows-[repeat(auto-fit,_1fr)] grid-cols-[repeat(auto-fit,_minmax(380px,_1fr))] gap-4">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <HomePlaylistSkeleton key={index} />
            ))}
          </>
        ) : (
          data && (
            <>
              {data.playlists.items.map((playlist, index) => (
                <HomePlaylistItem
                  uri={playlist.uri}
                  key={index}
                  url={`/playlist/${extractIdFromUrl(playlist.href)}`}
                  imageUrl={playlist.images[0].url}
                  title={playlist.name}
                />
              ))}
            </>
          )
        )}
      </div>
    </section>
  );
}
