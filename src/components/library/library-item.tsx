import { useSidebarStore } from "@/hooks/use-sidebar-store";
import { Link } from "react-router-dom";
import { BsSpotify } from "react-icons/bs";
import { cn } from "@/lib/utils";

interface LibraryItemProps {
  url: string;
  imageUrl: string;
  title: string;
  type: string;
  owner: string;
}

export function LibraryItem({
  url,
  imageUrl,
  title,
  type,
  owner,
}: LibraryItemProps) {
  const expand = useSidebarStore((state) => state.expand);

  return (
    <Link
      to={url}
      className="flex gap-2 items-center hover:bg-[#1A1A1A] transition rounded-md p-2"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          className={cn(
            "w-12 h-12",
            type === "Artist" ? "rounded-full" : "rounded-sm",
          )}
        />
      ) : (
        <BsSpotify className="text-green-500 text-2xl w-12 h-12 p-1" />
      )}
      {expand && (
        <div>
          <p className="text-white line-clamp-1">{title}</p>
          {type === "Artist" ? (
            <span className="text-sm text-white/60">Artist</span>
          ) : (
            <span className="text-sm text-white/60">
              {type} &bull; {owner}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
