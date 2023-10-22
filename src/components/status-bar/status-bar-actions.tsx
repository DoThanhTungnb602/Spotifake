import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useDebounce } from "@uidotdev/usehooks";

import { Slider } from "@/components/ui/slider";
import { BsFillFilePlayFill } from "react-icons/bs";
import { MdQueueMusic } from "react-icons/md";
import { TbDevices2 } from "react-icons/tb";
import { FaLaptop } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { PiSpeakerSimpleXBold } from "react-icons/pi";
import { PiSpeakerSimpleNoneBold } from "react-icons/pi";
import { PiSpeakerSimpleLowBold } from "react-icons/pi";
import { PiSpeakerSimpleHighBold } from "react-icons/pi";
import { FiArrowDownCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { usePlayingView } from "@/hooks/use-playing-view";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IDevices, IUser } from "@/type";
import { getDevices, transferPlayback } from "@/lib/player";
import { MusicWave } from "@/components/music-wave";

interface StatusActionsProps {
  isMuted: boolean;
  disable: boolean;
  onMute: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  className?: string;
}

export default function StatusActions({
  isMuted,
  disable,
  onMute,
  volume,
  onVolumeChange,
  className,
}: StatusActionsProps) {
  const onOpen = usePlayingView((state) => state.onOpen);
  const onClose = usePlayingView((state) => state.onClose);
  const isOpen = usePlayingView((state) => state.isOpen);
  const [user] = useLocalStorage<IUser>("user");
  const [volumeDebounce, setVolumeDebounce] = useState<number>(volume);
  const [mounted, setMounted] = useState(false);
  const debouncedVolume = useDebounce(volumeDebounce, 500);

  const devicesQuery = useQuery({
    queryKey: ["devices"],
    queryFn: (): Promise<IDevices> => getDevices(),
    enabled: !!user,
  });

  const transferPlaybackMutation = useMutation({
    mutationFn: ({ deviceId }: { deviceId: string }) =>
      transferPlayback(deviceId),
  });

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    onVolumeChange(debouncedVolume);
  }, [debouncedVolume]);

  return (
    <div className={cn("flex", className)}>
      <ActionTooltip label="Now Playing View" align="center" side="top">
        <Button
          disabled={disable}
          className={cn(
            "text-md rounded-full h-8 w-8 p-0 bg-transparent text-white/60 hover:bg-transparent hover:text-white transition",
            isOpen && "text-spotifake hover:text-spotifake",
          )}
          onClick={() => {
            isOpen ? onClose() : onOpen();
          }}
        >
          <BsFillFilePlayFill />
        </Button>
      </ActionTooltip>

      <ActionTooltip label="Queue" align="center" side="top">
        <Button
          className="text-xl rounded-full h-8 w-8 p-0 bg-transparent text-white/60 hover:bg-transparent hover:text-white transition"
          disabled={disable}
        >
          <Link to="/queue">
            <MdQueueMusic />
          </Link>
        </Button>
      </ActionTooltip>

      <DropdownMenu>
        <ActionTooltip label="Connect to a device" align="center" side="top">
          <DropdownMenuTrigger asChild>
            <Button className="text-md rounded-full h-8 w-8 p-0 bg-transparent text-white/60 hover:bg-transparent hover:text-white transition">
              <TbDevices2 className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </ActionTooltip>
        <DropdownMenuContent className="w-80 bg-[#282828] mr-5 p-5">
          <DropdownMenuGroup className="px-5 pt-2">
            {devicesQuery.data?.devices.length === 0 && (
              <>
                <p className="text-md font-semibold">No other devices found</p>
                <div className="flex gap-5 my-5 flex-col">
                  <div className="flex items-center gap-5 justify-center">
                    <AiOutlineWifi className="w-6 h-6 shrink-0" />
                    <div>
                      <p className="text-md">Check your WiFi</p>
                      <p className="text-sm text-white/60">
                        Connect the devices you're using to the same WiFi.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <TbDevices2 className="w-6 h-6 shrink-0" />
                    <div>
                      <p className="text-md">Play from another device</p>
                      <p className="text-sm text-white/60">
                        It will automatically appear here.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <FiArrowDownCircle className="w-6 h-6 shrink-0" />
                    <div>
                      <p className="text-md">Switch the Spotify app</p>
                      <p className="text-sm text-white/60">
                        The app can detect more devices.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DropdownMenuGroup>
          {devicesQuery.data?.devices.length !== 0 && (
            <div className="px-4">
              <p className="text-md font-semibold mb-5">Select a device</p>
              <DropdownMenuSeparator className="mb-4" />
            </div>
          )}
          {devicesQuery.data?.devices &&
            devicesQuery.data?.devices.map((device) => (
              <DropdownMenuItem
                key={device.id}
                onClick={() =>
                  transferPlaybackMutation.mutate({ deviceId: device.id })
                }
              >
                <div
                  className={cn(
                    "flex items-center gap-5 p-2 cursor-pointer",
                    device.is_active && "text-spotifake",
                  )}
                >
                  {device.is_active ? (
                    <div className="w-9 h-9 flex items-center justify-center">
                      <MusicWave />
                    </div>
                  ) : (
                    <FaLaptop className="w-9 h-9" />
                  )}
                  <p className="text-md font-semibold">{device.name}</p>
                </div>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <ActionTooltip
        label={isMuted ? "mute" : "unmute"}
        align="center"
        side="top"
      >
        <Button
          disabled={disable}
          className="text-xl rounded-full h-8 w-8 p-0 bg-transparent text-white/60 hover:bg-transparent hover:text-white transition"
          onClick={onMute}
        >
          {isMuted && <PiSpeakerSimpleXBold />}
          {!isMuted && volume < 10 && <PiSpeakerSimpleNoneBold />}
          {!isMuted && volume >= 10 && volume < 60 && (
            <PiSpeakerSimpleLowBold />
          )}
          {!isMuted && volume >= 60 && <PiSpeakerSimpleHighBold />}
          {!isMuted && !volume && <PiSpeakerSimpleHighBold />}
        </Button>
      </ActionTooltip>
      <Slider
        defaultValue={[volume]}
        disabled={disable}
        value={[volume]}
        onValueChange={(value) => setVolumeDebounce(value[0])}
        max={100}
        step={1}
        className="max-w-xs w-[100px]"
      />
    </div>
  );
}
