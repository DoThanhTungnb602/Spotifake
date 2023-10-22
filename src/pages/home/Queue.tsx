import { useLocalStorage } from "@uidotdev/usehooks";

import { QueuePlaying } from "@/components/queue/queue-playing";
import { QueueList } from "@/components/queue/queue-list";
import { IUser } from "@/type";

export default function Queue() {
  const [user] = useLocalStorage<IUser>("user");

  return (
    user && (
      <div className="flex flex-col">
        <div className="mt-28 px-6">
          <p className="text-2xl font-bold">
            {user.product === "premium" ? "Queue" : "Now Playing"}
          </p>
          <p className="font-semibold font-sm text-text-blur mt-5 mb-2">
            Now playing
          </p>
          <QueuePlaying />
          <p className="text-2xl font-bold mt-10 text-rose-300">
            {user.product === "free" &&
              "Queue API is only available for premium users"}
          </p>
        </div>

        {user.product === "premium" && (
          <div className="flex px-6 flex-col mt-10">
            <p className="font-semibold font-sm text-text-blur mb-2">
              Next in queue
            </p>
            <QueueList />
          </div>
        )}
      </div>
    )
  );
}
