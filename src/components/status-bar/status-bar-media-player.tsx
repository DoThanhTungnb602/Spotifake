import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import { LuShuffle } from "react-icons/lu";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsRepeat } from "react-icons/bs";
import { BsRepeat1 } from "react-icons/bs";
import { FaCirclePause } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { IRepeatState } from "@/type";
import { millisecondsToMinutesAndSeconds } from "@/lib/milliseconds-convert";

interface StatusMediaPlayerProps {
  duration: number;
  progress: number;
  isPlaying: boolean;
  isShuffled: boolean;
  repeatState: IRepeatState;
  disable: boolean;
  onPlayOrPause: () => void;
  onShuffle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onRepeat: () => void;
  onProgressChange: (progress: number) => void;
  className?: string;
}

export default function StatusMediaPlayer({
  duration,
  progress,
  isPlaying,
  isShuffled,
  repeatState,
  disable,
  onPlayOrPause,
  onShuffle,
  onPrevious,
  onNext,
  onRepeat,
  onProgressChange,
  className,
}: StatusMediaPlayerProps) {
  const [mounted, setMounted] = useState(false);
  const [progressDebounce, setProgressDebounce] = useState<number>(progress);
  const debouncedProgress = useDebounce(progressDebounce, 500);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    onProgressChange(debouncedProgress);
  }, [debouncedProgress]);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 max-w-xl flex-1",
        className,
      )}
    >
      <div className="flex gap-2 items-center">
        <ActionTooltip label="Shuffle" align="center" side="top">
          <Button
            disabled={disable}
            className={cn(
              "text-xl rounded-full h-10 w-10 p-0 bg-transparent text-white/60 hover:bg-transparent hover:text-white transition",
              isShuffled && "text-spotifake/60 hover:text-spotifake",
            )}
            onClick={onShuffle}
          >
            <LuShuffle />
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Previous" align="center" side="top">
          <Button
            disabled={disable}
            className="text-xl rounded-full h-10 w-10 p-0 bg-transparent text-white/60 hover:bg-transparent hover:text-white transition"
            onClick={onPrevious}
          >
            <TbPlayerTrackPrevFilled />
          </Button>
        </ActionTooltip>
        <ActionTooltip
          label={isPlaying ? "Pause" : "Play"}
          align="center"
          side="top"
        >
          <Button
            disabled={disable}
            className="text-4xl rounded-full h-12 w-12 p-0 bg-[#000000]/70 text-white hover:bg-[#000000]/70"
            onClick={onPlayOrPause}
          >
            {isPlaying ? <FaCirclePause /> : <BsFillPlayCircleFill />}
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Next" align="center" side="top">
          <Button
            disabled={disable}
            className="text-xl rounded-full h-10 w-10 p-0 bg-transparent text-white/60 hover:bg-transparent hover:text-white transition"
            onClick={onNext}
          >
            <TbPlayerTrackNextFilled />
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Repeat" align="center" side="top">
          <Button
            disabled={disable}
            className={cn(
              "text-xl rounded-full h-10 w-10 p-0 bg-transparent text-white/60 hover:bg-transparent hover:text-white transition",
              repeatState &&
                repeatState !== "off" &&
                "text-spotifake/60 hover:text-spotifake",
            )}
            onClick={onRepeat}
          >
            {!repeatState && <BsRepeat />}
            {repeatState === "track" && <BsRepeat1 />}
            {repeatState === "off" && <BsRepeat />}
            {repeatState === "context" && <BsRepeat />}
          </Button>
        </ActionTooltip>
      </div>

      <div className="flex gap-2 w-full">
        <span className="text-white/70 text-xs">
          {duration ? millisecondsToMinutesAndSeconds(progress) : "-:--"}
        </span>
        <Slider
          defaultValue={[progress ? progress / 1000 : 0]}
          disabled={disable}
          value={[progress ? progress / 1000 : 0]}
          max={duration ? duration / 1000 : 0}
          step={1}
          className="max-w-xl w-full"
          onValueChange={(value) => setProgressDebounce(value[0] * 1000)}
        />
        <span className="text-white/70 text-xs">
          {duration ? millisecondsToMinutesAndSeconds(duration) : "-:--"}
        </span>
      </div>
    </div>
  );
}
