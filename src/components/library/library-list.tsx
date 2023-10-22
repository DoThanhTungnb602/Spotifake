import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { ScrollArea } from "@/components/ui/scroll-area";
import { LibraryItem } from "./library-item";

import {
  ICurrentUserPlaylists,
  IUserSavedAlbums,
  IFollowedArtists,
  ILibraryActiveView,
  IUserSavedTracks,
} from "@/type";
import { extractIdFromUrl } from "@/lib/extract-id-from-url";
import { AiFillEyeInvisible } from "react-icons/ai";
import { getUserPlaylists } from "@/lib/playlist";
import { getFollowedArtists } from "@/lib/artist";
import { getUserSavedAlbums } from "@/lib/album";
import { getUserSavedTracks } from "@/lib/track";
import { LibrarySkeleton } from "./library-skeleton";

export function LibraryList({ active }: { active: ILibraryActiveView }) {
  const [user] = useLocalStorage("user");

  const userPlaylistsQuery = useQuery({
    queryKey: ["library-playlists"],
    queryFn: (): Promise<ICurrentUserPlaylists> => getUserPlaylists(),
    enabled: !!user && active === "Playlists",
  });

  const followedArtistsQuery = useQuery({
    queryKey: ["library-artists"],
    queryFn: (): Promise<IFollowedArtists> => getFollowedArtists(),
    enabled: !!user && active === "Artists",
  });

  const userSavedAlbumsQuery = useQuery({
    queryKey: ["library-albums"],
    queryFn: (): Promise<IUserSavedAlbums> => getUserSavedAlbums(),
    enabled: !!user && active === "Albums",
  });

  const userSavedTracksQuery = useQuery({
    queryKey: ["library-tracks"],
    queryFn: (): Promise<IUserSavedTracks> => getUserSavedTracks(),
    enabled: !!user && active === "Saved Tracks",
  });

  return (
    <>
      <ScrollArea className="mb-2">
        {active === "Playlists" &&
          (userPlaylistsQuery.isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <LibrarySkeleton key={index} />
              ))
            : userPlaylistsQuery.data?.items.map((playlist, index) => (
                <LibraryItem
                  key={index}
                  url={`/playlist/${extractIdFromUrl(playlist.href)}`}
                  imageUrl={playlist?.images[0]?.url}
                  title={playlist.name}
                  type="Playlist"
                  owner={playlist.owner.display_name}
                />
              )))}

        {active === "Artists" &&
          (followedArtistsQuery.isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <LibrarySkeleton key={index} type="artist" />
              ))
            : followedArtistsQuery.data?.artists.items.map((artist, index) => (
                <LibraryItem
                  key={index}
                  url={`/artist/${extractIdFromUrl(artist.href)}`}
                  imageUrl={artist?.images[0]?.url}
                  title={artist.name}
                  type="Artist"
                  owner="Spotify"
                />
              )))}

        {active === "Albums" &&
          (userSavedAlbumsQuery.isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <LibrarySkeleton key={index} />
              ))
            : userSavedAlbumsQuery.data?.items.map((album, index) => (
                <LibraryItem
                  key={index}
                  url={`/album/${extractIdFromUrl(album.album.href)}`}
                  imageUrl={album?.album.images[0]?.url}
                  title={album.album.name}
                  type="Album"
                  owner={album.album.artists[0].name}
                />
              )))}

        {active === "Saved Tracks" &&
          (userSavedTracksQuery.isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <LibrarySkeleton key={index} />
              ))
            : userSavedTracksQuery.data?.items.map((track, index) => (
                <LibraryItem
                  key={index}
                  url={`/track/${extractIdFromUrl(track.track.href)}`}
                  imageUrl={track?.track.album.images[0]?.url}
                  title={track.track.name}
                  type="Track"
                  owner={track.track.album.artists[0].name}
                />
              )))}

        {active === "Podcasts" && (
          <div className="flex items-center justify-center mt-20">
            <AiFillEyeInvisible className="text-spotifake text-center w-6 h-6" />
          </div>
        )}
        {active === "Shows" && (
          <div className="flex items-center justify-center mt-20">
            <AiFillEyeInvisible className="text-spotifake text-center w-6 h-6" />
          </div>
        )}
      </ScrollArea>
    </>
  );
}
