import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "./action-tooltip";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  followPlaylist,
  isFollowingPlaylist,
  unfollowPlaylist,
} from "@/lib/playlist";
import { IUser } from "@/type";

interface Props {
  id: string;
  className?: string;
}

export function BtnAdd({ id, className }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [user] = useLocalStorage<IUser>("user");
  const queryClient = useQueryClient();

  const followPlaylistMutation = useMutation({
    mutationFn: ({ id, follow }: { id: string; follow: boolean }) => {
      if (follow) {
        return followPlaylist(id);
      } else {
        return unfollowPlaylist(id);
      }
    },
    onMutate: ({ id, follow }: { id: string; follow: boolean }) => {
      follow
        ? toast("Added to Your Library")
        : toast("Removed from Your Library");
      setIsLiked(follow);
    },
    onError: (error, variables) => {
      toast("Something went wrong");
      setIsLiked(!variables.follow);
    },
    onSettled: async () => {
      const checkIsLiked = await isFollowingPlaylist(id, user.id);
      if (checkIsLiked) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      queryClient.invalidateQueries({ queryKey: ["library-playlists"] });
    },
  });

  return (
    <ActionTooltip
      label="Save to Your Library"
      align="center"
      side="top"
      className={className}
    >
      <Button
        className="rounded-full p-0 bg-transparent text-white/60 hover:text-white transition hover:bg-transparent w-14 h-14 text-4xl"
        onClick={() => {
          followPlaylistMutation.mutate({ id, follow: !isLiked });
        }}
      >
        {isLiked ? (
          <AiFillHeart className="text-spotifake" />
        ) : (
          <AiOutlineHeart />
        )}
      </Button>
    </ActionTooltip>
  );
}
