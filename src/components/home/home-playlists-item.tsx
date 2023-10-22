import { BtnPlay } from "@/components/btn-play";
import { Link } from "react-router-dom";

interface HomePlaylistItemProps {
  url: string;
  uri: string;
  imageUrl: string;
  title: string;
}

export default function HomePlaylistItem({
  url,
  uri,
  imageUrl,
  title,
}: HomePlaylistItemProps) {
  return (
    <Link
      className="rounded-md overflow-hidden flex justify-between items-center bg-[#b3b3b3]/20 hover:bg-[#b3b3b3]/30 transition-all group min-w-[260px]"
      to={url}
    >
      <div className="flex gap-3 items-center">
        <img
          src={imageUrl}
          alt={title}
          width={80}
          height={80}
          className="shadow-lg shadow-black/50"
        />
        <p className="text font-semibold">{title}</p>
      </div>
      <BtnPlay
        className="mr-5 opacity-0 group-hover:opacity-100 transition"
        uri={uri}
      />
    </Link>
  );
}
