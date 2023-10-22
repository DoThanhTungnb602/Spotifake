import { useQuery } from "@tanstack/react-query";
import { IArtistAlbums } from "@/type";
import { getArtistAlbums } from "@/lib/artist";

export const useArtistAlbumsQuery = (
  artistId: string,
  limit?: number,
  queryKey?: string,
) => {
  const artistAlbumsQuery = useQuery({
    queryKey: ["artist-albums", artistId, queryKey],
    queryFn: (): Promise<IArtistAlbums> => getArtistAlbums(artistId, limit),
  });

  return artistAlbumsQuery;
};
