import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";
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

export function BtnFollowPlaylist({ id, className }: Props) {
  const [isFollow, setIsFollow] = useState(false);
  const [user] = useLocalStorage<IUser>("user");
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ["check-if-follow-playlist", id],
    queryFn: (): Promise<boolean> => isFollowingPlaylist(id, user.id),
    onSuccess: (data) => {
      data ? setIsFollow(true) : setIsFollow(false);
    },
    refetchInterval: 1000,
    enabled: !!user,
  });

  const followPlaylistMutation = useMutation({
    mutationFn: ({ id, follow }: { id: string; follow: boolean }) => {
      return follow ? followPlaylist(id) : unfollowPlaylist(id);
    },
    onMutate: ({ id, follow }: { id: string; follow: boolean }) => {
      follow
        ? toast("Added to Your Library")
        : toast("Removed from Your Library");
      setIsFollow(follow);
    },
    onError: (error, variables) => {
      toast("Something went wrong");
      setIsFollow(!variables.follow);
    },
    onSettled: async () => {
      const checkIsFollow = await isFollowingPlaylist(id, user.id);
      if (checkIsFollow) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
      queryClient.invalidateQueries({ queryKey: ["library-playlists"] });
    },
  });

  const handleFollow = () => {
    if (!user) {
      toast("You need to login first");
      return;
    }
    followPlaylistMutation.mutate({ id, follow: !isFollow });
  };

  return (
    <ActionTooltip
      label="Save to Your Library"
      align="center"
      side="top"
      className={className}
    >
      <Button
        className="rounded-full p-0 bg-transparent text-white/60 hover:text-white transition hover:bg-transparent w-14 h-14 text-4xl"
        onClick={handleFollow}
      >
        {isFollow ? (
          <AiFillHeart className="text-spotifake" />
        ) : (
          <AiOutlineHeart />
        )}
      </Button>
    </ActionTooltip>
  );
}
