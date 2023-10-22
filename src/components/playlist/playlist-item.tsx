import { useState } from "react";

import { Link } from "react-router-dom";
import { MoreActions } from "@/components/more-actions";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";

import { BsFillPlayFill } from "react-icons/bs";
import { GiPauseButton } from "react-icons/gi";
import { MusicWave } from "@/components/music-wave";

import { ITrack } from "@/type";
import { extractIdFromUrl } from "@/lib/extract-id-from-url";
import { millisecondsToMinutesAndSeconds } from "@/lib/milliseconds-convert";
import { BtnSaveTrack } from "../track/btn-save-track.tsx";

export function PlaylistListItem({
  track,
  index,
  isSaved = false,
}: {
  track: ITrack;
  index: number;
  isSaved: boolean | undefined;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <tr key={track.name} className="h-[56px] group">
      <td className="flex justify-center items-center h-[56px] group-hover:bg-[#2A2A2A] rounded-l-md transition">
        {!isPlaying && (
          <span className="block group-hover:hidden">{index}</span>
        )}
        {isPlaying && <MusicWave />}
        {!isPlaying && (
          <ActionTooltip
            label="Play"
            align="center"
            side="top"
            className="hidden group-hover:block"
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
            className="hidden group-hover:block"
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
      <td className="group-hover:bg-[#2A2A2A] transition pr-5">
        <div className="flex items-center gap-4">
          <img
            src={track.album.images.filter((image) => image.url != null)[0].url}
            className="w-10 h-10"
          />
          <div>
            <Link
              to={`/track/${track.id}`}
              className="hover:underline transition line-clamp-1"
            >
              {track.name}
            </Link>
            <div className="flex">
              {track.artists.map((artist, index) => {
                return (
                  <div key={artist.name}>
                    <Link
                      to={`/artist/${extractIdFromUrl(
                        artist.external_urls.spotify,
                      )}`}
                      className="hover:underline transition text-sm text-text-blur hover:text-white whitespace-nowrap"
                    >
                      {artist.name}
                    </Link>
                    {index !== track.artists.length - 1 && (
                      <span className="text-text-blur">,&nbsp;</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </td>
      <td className="group-hover:bg-[#2A2A2A] transition pr-5">
        <Link
          to={`/album/${extractIdFromUrl(track.album.external_urls.spotify)}`}
          className="hover:underline transition text-sm text-text-blur hover:text-white line-clamp-1"
        >
          {track.album.name}
        </Link>
      </td>
      <td className="group-hover:bg-[#2A2A2A] transition text-text-blur text-sm pr-5">
        <p>{track.album.release_date}</p>
      </td>
      <td className="group-hover:bg-[#2A2A2A] transition rounded-r-md px-5">
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
