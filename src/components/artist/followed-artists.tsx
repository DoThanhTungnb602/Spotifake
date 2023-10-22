import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { CardList } from "@/components/card-list";
import { IUser, IFollowedArtists } from "@/type";
import { getFollowedArtists } from "@/lib/artist";
import { BiLoaderAlt } from "react-icons/bi";

export default function FollowedArtists() {
  const [user] = useLocalStorage<IUser>("user");

  const followedArtistsQuery = useQuery({
    queryKey: ["followed-artists"],
    queryFn: (): Promise<IFollowedArtists> => getFollowedArtists(),
    enabled: !!user,
  });

  return (
    <>
      {followedArtistsQuery.isLoading && (
        <div className="flex items-center justify-center h-[400px]">
          <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake" />
        </div>
      )}
      {followedArtistsQuery.data && (
        <CardList data={followedArtistsQuery.data?.artists.items} />
      )}
    </>
  );
}
