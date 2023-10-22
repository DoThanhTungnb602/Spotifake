import { useCheckSavedTracksQuery } from "@/hooks/use-check-saved-track-query.ts";

import { Link } from "react-router-dom";
import { BtnSaveTrack } from "@/components/track/btn-save-track.tsx";
import { cn } from "@/lib/utils";
import { ITrack } from "@/type";

export default function StatusInformation({
  track,
  className,
}: {
  track: ITrack;
  className?: string;
}) {
  const checkSavedTrackQuery = useCheckSavedTracksQuery([track?.id]);

  return track ? (
    <div className={cn("flex gap-3 items-center", className)}>
      <img
        src={track.album.images[0].url}
        width={56}
        height={56}
        alt={track.name}
        className="rounded-md"
      />
      <div className="flex flex-col justify-center">
        <Link
          to={`/track/${track.id}`}
          className="hover:underline transition text-sm line-clamp-1"
        >
          {track.name}
        </Link>
        <Link
          to={`/artist/${track.artists[0].id}`}
          className="hover:underline transition text-xs text-white/60 hover:text-white"
        >
          {track.artists[0].name}
        </Link>
      </div>
      <BtnSaveTrack
        id={track.id}
        isSaved={checkSavedTrackQuery.data?.[0] ?? false}
      />
    </div>
  ) : (
    <div />
  );
}
