import { useQuery } from "@tanstack/react-query";
import { IArtist } from "@/type";
import { getArtist } from "@/lib/artist";

export const useArtistQuery = (id: string) => {
  const artistQuery = useQuery({
    queryKey: ["artist", id],
    queryFn: (): Promise<IArtist> => getArtist(id),
    enabled: !!id,
  });

  return artistQuery;
};
