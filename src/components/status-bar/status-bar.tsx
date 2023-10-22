import { useMutation } from "@tanstack/react-query";
import { usePlaybackState } from "@/hooks/use-playback-state-query";

import StatusInformation from "./status-bar-info";
import StatusMediaPlayer from "./status-bar-media-player";
import StatusActions from "./status-bar-actions";
import { IRepeatState, ITrack } from "@/type";
import {
  pausePlayback,
  seekToPosition,
  setPlaybackVolume,
  setRepeatMode,
  skipToNext,
  skipToPrevious,
  startPlayback,
  togglePlaybackShuffle,
} from "@/lib/player";

const repeatState: IRepeatState[] = ["off", "context", "track"];

export default function StatusBar() {
  const playbackStateQuery = usePlaybackState();

  const pausePlaybackMutation = useMutation({
    mutationFn: ({ deviceId }: { deviceId?: string }) =>
      pausePlayback(deviceId),
  });

  const startPlaybackMutation = useMutation({
    mutationFn: ({ deviceId }: { deviceId?: string }) =>
      startPlayback(deviceId),
  });

  const skipToNextMutation = useMutation({
    mutationFn: ({ deviceId }: { deviceId?: string }) => skipToNext(deviceId),
  });

  const skipToPreviousMutation = useMutation({
    mutationFn: ({ deviceId }: { deviceId?: string }) =>
      skipToPrevious(deviceId),
  });

  const togglePlaybackShuffleMutation = useMutation({
    mutationFn: ({ state, deviceId }: { state: boolean; deviceId?: string }) =>
      togglePlaybackShuffle(state, deviceId),
  });

  const setRepeatModeMutation = useMutation({
    mutationFn: ({
      state,
      deviceId,
    }: {
      state: IRepeatState;
      deviceId?: string;
    }) => setRepeatMode(state, deviceId),
  });

  const setPlaybackVolumeMutation = useMutation({
    mutationFn: ({ volume, deviceId }: { volume: number; deviceId?: string }) =>
      setPlaybackVolume(volume, deviceId),
  });

  const seekToPositionMutation = useMutation({
    mutationFn: ({
      position,
      deviceId,
    }: {
      position: number;
      deviceId?: string;
    }) => seekToPosition(position, deviceId),
  });

  const handlePlayOrPause = () => {
    if (playbackStateQuery.data?.is_playing) {
      pausePlaybackMutation.mutate({});
    } else {
      startPlaybackMutation.mutate({});
    }
  };

  const handleOnShuffle = () => {
    togglePlaybackShuffleMutation.mutate({
      state: !playbackStateQuery.data?.shuffle_state,
    });
  };

  const handleOnPrevious = () => {
    skipToPreviousMutation.mutate({});
  };

  const handleOnNext = () => {
    skipToNextMutation.mutate({});
  };

  const handleOnRepeat = () => {
    setRepeatModeMutation.mutate({
      state:
        repeatState[
          repeatState.indexOf(
            playbackStateQuery.data?.repeat_state as IRepeatState,
          ) + 1
        ],
    });
  };

  const handleOnMute = () => {
    setPlaybackVolumeMutation.mutate({ volume: 0 });
  };

  const handleOnVolumeChange = (value: number) => {
    setPlaybackVolumeMutation.mutate({ volume: value });
  };

  const handleProgressChange = (progress: number) => {
    seekToPositionMutation.mutate({ position: progress });
  };

  return (
    <div className="grid grid-cols-3 items-center p-1 gap-4 row-span-1 col-span-2">
      <StatusInformation track={playbackStateQuery.data?.item as ITrack} />
      <StatusMediaPlayer
        disable={!playbackStateQuery.data}
        duration={playbackStateQuery.data?.item?.duration_ms as number}
        progress={playbackStateQuery.data?.progress_ms as number}
        isPlaying={playbackStateQuery.data?.is_playing as boolean}
        isShuffled={playbackStateQuery.data?.shuffle_state as boolean}
        repeatState={playbackStateQuery.data?.repeat_state as IRepeatState}
        onPlayOrPause={handlePlayOrPause}
        onShuffle={handleOnShuffle}
        onPrevious={handleOnPrevious}
        onNext={handleOnNext}
        onRepeat={handleOnRepeat}
        onProgressChange={handleProgressChange}
      />
      <StatusActions
        disable={!playbackStateQuery.data}
        className="justify-self-end"
        isMuted={playbackStateQuery.data?.device?.volume_percent === 0}
        volume={playbackStateQuery.data?.device?.volume_percent as number}
        onMute={handleOnMute}
        onVolumeChange={handleOnVolumeChange}
      />
    </div>
  );
}
