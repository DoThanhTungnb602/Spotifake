import { BtnPlay } from "@/components/btn-play";
import { Link } from "react-router-dom";

interface ArtistCardProps {
  url: string;
  uri: string;
  imageUrl: string;
  name: string;
}

export function ArtistCard({ url, uri, imageUrl, name }: ArtistCardProps) {
  return (
    <Link
      className="flex flex-col p-4 justify-center bg-[#282828]/30 hover:bg-[#282828] transition-all rounded-md group overflow-hidden"
      to={url}
    >
      <div className="relative">
        <img
          src={imageUrl}
          className="shadow-md object-cover shadow-black/50 aspect-square w-full rounded-full"
        />
        <BtnPlay
          className="absolute bottom-0 right-2 group-hover:-translate-y-2 opacity-0 group-hover:opacity-100 transition-all"
          uri={uri}
        />
      </div>
      <p className="text-md font-semibold truncate mb-2 mt-4">{name}</p>
      <span className="text-white/70 text-sm line-clamp-2">Artist</span>
    </Link>
  );
}
