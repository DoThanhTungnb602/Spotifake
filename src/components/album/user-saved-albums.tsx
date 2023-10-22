import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { CardList } from "@/components/card-list";

import { IUser, IUserSavedAlbums } from "@/type";
import { getUserSavedAlbums } from "@/lib/album";
import { BiLoaderAlt } from "react-icons/bi";

export default function UserSavedAlbums() {
  const [user] = useLocalStorage<IUser>("user");

  const userSavedAlbumsQuery = useQuery({
    queryKey: ["user-saved-albums"],
    queryFn: (): Promise<IUserSavedAlbums> => getUserSavedAlbums(),
    enabled: !!user,
  });

  return (
    <>
      {userSavedAlbumsQuery.isLoading ? (
        <div className="flex items-center justify-center h-[400px]">
          <BiLoaderAlt className="w-12 h-12 animate-spin text-spotifake" />
        </div>
      ) : (
        userSavedAlbumsQuery.data?.items && (
          <CardList data={userSavedAlbumsQuery.data?.items} />
        )
      )}
    </>
  );
}
