import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { QueueItem } from "./queue-item";
import { IUser } from "@/type";
import { getQueue } from "@/lib/player";

export function QueueList() {
  const [user] = useLocalStorage<IUser>("user");

  const queueQuery = useQuery({
    queryKey: ["queue"],
    queryFn: () => getQueue(),
    enabled: !!user,
  });

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-[60px]"></th>
        </tr>
      </thead>
      <tbody>
        {queueQuery.data?.queue?.map((track, index) => (
          <QueueItem
            key={track.name}
            track={track}
            index={index + 1}
            isPlaying={false}
            nowPlaying={false}
          />
        ))}
      </tbody>
    </table>
  );
}
