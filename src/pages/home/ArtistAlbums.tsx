import { useParams } from "react-router-dom";
import { useArtistAlbumsQuery } from "@/hooks/use-artist-albums-query";

import { CardList } from "@/components/card-list";

export default function ArtistAlbums() {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };

  const artistAlbumsQuery = useArtistAlbumsQuery(
    artistId,
    undefined,
    "artist albums page",
  );

  return (
    <section className="flex px-5 pt-20 flex-col gap-5">
      <p className="text-white text-3xl font-semibold">
        {artistAlbumsQuery.data?.items[0].artists[0].name} Albums
      </p>
      {artistAlbumsQuery.data && (
        <CardList data={artistAlbumsQuery.data?.items} />
      )}
    </section>
  );
}
