import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { followArtist, isFollowingArtist, unfollowArtist } from "@/lib/artist";
import { cn } from "@/lib/utils";
import { IUser } from "@/type";

interface Props {
  id: string;
  className?: string;
  view: "artist page" | "playing view";
}

export function BtnFollowArtist({ id, className, view }: Props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [user] = useLocalStorage<IUser>("user");
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ["check-if-follow-artist", id, view],
    queryFn: (): Promise<boolean> => isFollowingArtist(id),
    onSuccess: (data) => {
      data ? setIsFollowed(true) : setIsFollowed(false);
    },
    refetchInterval: 1000,
    enabled: !!user,
  });

  const followArtistMutation = useMutation({
    mutationFn: ({ id, follow }: { id: string; follow: boolean }) => {
      return follow ? followArtist(id) : unfollowArtist(id);
    },
    onMutate: ({ id, follow }: { id: string; follow: boolean }) => {
      follow
        ? toast("Added to Your Library")
        : toast("Removed from Your Library");
      setIsFollowed(follow);
    },
    onError: (error, variables) => {
      toast("Something went wrong");
      setIsFollowed(!variables.follow);
    },
    onSettled: async () => {
      const checkIsFollow = await isFollowingArtist(id);
      if (checkIsFollow) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
      queryClient.invalidateQueries({ queryKey: ["library-artists"] });
    },
  });

  const handleFollow = () => {
    if (!user) {
      toast("You need to login first");
      return;
    }
    followArtistMutation.mutate({ id, follow: !isFollowed });
  };

  return (
    <Button
      className={cn(
        "rounded-full bg-transparent text-white hover:bg-transparent border-[1px] border-white/40 hover:border-white transition hover:scale-105",
        className,
      )}
      onClick={handleFollow}
    >
      {isFollowed
        ? view === "playing view"
          ? "Unfollow"
          : "Following"
        : "Follow"}
    </Button>
  );
}
