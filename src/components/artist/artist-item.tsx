import { useState } from "react";
import { Link } from "react-router-dom";

import { MoreActions } from "@/components/more-actions";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { BtnSaveTrack } from "@/components/track/btn-save-track.tsx";
import { MusicWave } from "@/components/music-wave";

import { BsFillPlayFill } from "react-icons/bs";
import { GiPauseButton } from "react-icons/gi";

import { ITrack } from "@/type";
import { millisecondsToMinutesAndSeconds } from "@/lib/milliseconds-convert";

export function ArtistTopTracksItem({
  track,
  index,
  isSaved = false,
}: {
  track: ITrack;
  index: number;
  isSaved?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <tr key={track.name} className="h-[56px] group">
      <td className="flex justify-center items-center h-[56px] group-hover:bg-[#2A2A2A] rounded-l-md transition">
        {!isPlaying && (
          <span className="group-hover:hidden block">{index}</span>
        )}
        {isPlaying && <MusicWave />}
        {!isPlaying && (
          <ActionTooltip
            label="Play"
            align="center"
            side="top"
            className="group-hover:block hidden"
          >
            <Button
              className="bg-transparent text-white/60 hover:text-white transition hover:bg-transparent p-1"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <BsFillPlayFill className="w-6 h-6" />
            </Button>
          </ActionTooltip>
        )}
        {isPlaying && (
          <ActionTooltip
            label="Pause"
            align="center"
            side="top"
            className="group-hover:block hidden"
          >
            <Button
              className="bg-transparent text-white/60 hover:text-white transition hover:bg-transparent p-1"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <GiPauseButton className="w-5 h-5" />
            </Button>
          </ActionTooltip>
        )}
      </td>
      <td className="group-hover:bg-[#2A2A2A] transition">
        <div className="flex items-center gap-4">
          <img src={track.album.images[0].url} className="w-10 h-10" />
          <div>
            <Link
              to={`/track/${track.id}`}
              className="hover:underline transition"
            >
              {track.name}
            </Link>
          </div>
        </div>
      </td>
      <td className="group-hover:bg-[#2A2A2A] transition rounded-r-md">
        <div className="flex items-center gap-2 justify-center">
          <BtnSaveTrack
            isSaved={isSaved}
            id={track.id}
            className="group-hover:visible invisible"
          />
          <p className="ml-2 text-text-blur text-sm">
            {millisecondsToMinutesAndSeconds(track.duration_ms)}
          </p>
          <MoreActions className="group-hover:visible invisible" />
        </div>
      </td>
    </tr>
  );
}
