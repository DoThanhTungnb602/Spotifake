import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import DailyPlaylists from "@/components/home/home-playlists";
import { CardList } from "@/components/card-list";

import {
  IFeaturedPlaylists,
  IFollowedArtists,
  ICurrentUserPlaylists,
  IUserSavedAlbums,
} from "@/type";
import { getFeaturedPlaylists, getUserPlaylists } from "@/lib/playlist";
import { getUserSavedAlbums } from "@/lib/album";
import { getFollowedArtists } from "@/lib/artist";
import { CardListSkeleton } from "@/components/card-list-skeleton";

export default function Index() {
  const [user] = useLocalStorage("user");

  const featuredPlaylistsQuery = useQuery({
    queryKey: ["featured-playlists"],
    queryFn: (): Promise<IFeaturedPlaylists> => getFeaturedPlaylists(6),
  });

  const recentPlaylistsQuery = useQuery({
    queryKey: ["user-playlists", "home-page"],
    queryFn: (): Promise<ICurrentUserPlaylists> => getUserPlaylists(6),
    enabled: !!user,
  });

  const followedArtistsQuery = useQuery({
    queryKey: ["followed-artists", "home-page"],
    queryFn: (): Promise<IFollowedArtists> => getFollowedArtists(6),
    enabled: !!user,
  });

  const userSavedAlbumsQuery = useQuery({
    queryKey: ["user-saved-albums", "home-page"],
    queryFn: (): Promise<IUserSavedAlbums> => getUserSavedAlbums(6),
    enabled: !!user,
  });

  if (user) {
    return (
      <div className="flex flex-col gap-10 px-5 pt-24">
        <DailyPlaylists />
        {recentPlaylistsQuery.isLoading ? (
          <CardListSkeleton
            title="Your's Playlists"
            url="/collection/playlists"
            type="playlist"
          />
        ) : (
          recentPlaylistsQuery.data?.items && (
            <CardList
              title="Your's Playlists"
              url="/collection/playlists"
              data={recentPlaylistsQuery.data?.items}
            />
          )
        )}

        {followedArtistsQuery.isLoading ? (
          <CardListSkeleton
            title="Followed Artists"
            url="/collection/artists"
            type="artist"
          />
        ) : (
          followedArtistsQuery.data?.artists?.items && (
            <CardList
              title="Followed Artists"
              url="/collection/artists"
              data={followedArtistsQuery.data?.artists?.items}
            />
          )
        )}

        {userSavedAlbumsQuery.isLoading ? (
          <CardListSkeleton
            title="Saved Albums"
            url="/collection/albums"
            type="album"
          />
        ) : (
          userSavedAlbumsQuery.data?.items && (
            <CardList
              title="Saved Albums"
              url="/collection/albums"
              data={userSavedAlbumsQuery.data?.items}
            />
          )
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-10 px-5 pt-24">
        {featuredPlaylistsQuery.isLoading ? (
          <p className="text-white">Loading...</p>
        ) : (
          featuredPlaylistsQuery.data?.playlists?.items && (
            <CardList
              title="Spotify Playlists"
              url="/"
              data={featuredPlaylistsQuery.data?.playlists?.items}
            />
          )
        )}
      </div>
    );
  }
}
