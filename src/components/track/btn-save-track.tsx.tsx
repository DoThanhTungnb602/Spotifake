import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { isSavedTracks, removeTrack, saveTrack } from "@/lib/track";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BtnSaveTrack({
  isSaved,
  id,
  className,
  size = "sm",
}: {
  isSaved: boolean;
  id: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [isLiked, setIsLiked] = useState(isSaved);

  useEffect(() => {
    setIsLiked(isSaved);
  }, [isSaved]);

  const saveOrRemoveTrackMutation = useMutation({
    mutationFn: ({ id, save }: { id: string; save: boolean }) => {
      if (save) {
        return saveTrack(id);
      } else {
        return removeTrack(id);
      }
    },
    onMutate: ({ id, save }) => {
      save
        ? toast("Saved to your Liked Songs")
        : toast("Removed from your Liked Songs");
      setIsLiked(save);
    },
    onError: (error, variables) => {
      toast("Something went wrong");
      setIsLiked(!variables.save);
    },
    onSettled: async () => {
      const checkIsLiked = await isSavedTracks([id]);
      if (checkIsLiked[0]) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    },
  });

  return (
    <ActionTooltip
      label={
        isLiked ? "Remove from your Liked Songs" : "Save to your Liked Songs"
      }
      align="center"
      side="top"
      className={cn(isLiked && "!visible", className ?? "")}
    >
      <Button
        className={cn(
          "rounded-full p-0 bg-transparent text-white/60 hover:text-white transition hover:bg-transparent",
          size === "sm" && "w-8 h-8 text-xl",
          size === "md" && "w-10 h-10 text-2xl",
          size === "lg" && "w-10 h-10 text-4xl",
        )}
        onClick={() => {
          saveOrRemoveTrackMutation.mutate({ id, save: !isLiked });
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
