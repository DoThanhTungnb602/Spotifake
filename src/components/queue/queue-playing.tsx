import { usePlaybackState } from "@/hooks/use-playback-state-query";
import { QueueItem } from "./queue-item";

export function QueuePlaying() {
  const playbackStateQuery = usePlaybackState();

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-[60px]"></th>
        </tr>
      </thead>
      <tbody>
        {playbackStateQuery.data?.item && (
          <QueueItem
            track={playbackStateQuery.data?.item}
            index={1}
            isPlaying={playbackStateQuery.data?.is_playing}
            nowPlaying={true}
          />
        )}
      </tbody>
    </table>
  );
}
