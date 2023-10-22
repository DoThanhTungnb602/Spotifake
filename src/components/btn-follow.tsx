import { useState } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  view: "artist page" | "playing view";
  artistId: string;
};

export function BtnFollow({ view, artistId }: Props) {
  const [isFollowed, setIsFollowed] = useState(false);

  function handleFollow() {
    console.log(artistId);
    setIsFollowed(!isFollowed);
  }

  return (
    <Button
      className="rounded-full bg-transparent text-white hover:bg-transparent border-[1px] border-white/40 hover:border-white transition hover:scale-105"
      onClick={handleFollow}
    >
      {isFollowed
        ? view === "playing view"
          ? "Followed"
          : "Following"
        : "Follow"}
    </Button>
  );
}
