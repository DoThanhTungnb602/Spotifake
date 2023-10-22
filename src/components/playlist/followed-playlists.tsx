import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { CardList } from "@/components/card-list";

import { ICurrentUserPlaylists, IUser } from "@/type";
import { getUserPlaylists } from "@/lib/playlist";
import { BiLoaderAlt } from "react-icons/bi";

export default function UserPlaylists() {
  const [user] = useLocalStorage<IUser>("user");

  const recentPlaylistsQuery = useQuery({
    queryKey: ["user-playlists"],
    queryFn: (): Promise<ICurrentUserPlaylists> => getUserPlaylists(),
    enabled: !!user,
  });

  return (
    <>
      {recentPlaylistsQuery.isLoading && (
        <div className="flex items-center justify-center h-[400px]">
          <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake" />
        </div>
      )}
      {recentPlaylistsQuery.data && (
        <CardList data={recentPlaylistsQuery.data?.items} />
      )}
    </>
  );
}
