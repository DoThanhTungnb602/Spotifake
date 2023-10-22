import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { toast } from "sonner";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { IUser } from "@/type";
import { isSavedAlbum, removeAlbum, saveAlbum } from "@/lib/album";

interface Props {
  id: string;
  className?: string;
}

export function BtnSaveAlbum({ id, className }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [user] = useLocalStorage<IUser>("user");
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ["check-saved-album", id],
    queryFn: (): Promise<boolean> => isSavedAlbum(id),
    onSuccess: (data) => {
      data ? setIsLiked(true) : setIsLiked(false);
    },
    refetchInterval: 1000,
    enabled: !!user,
  });

  const saveAlbumMutation = useMutation({
    mutationFn: ({ id, save }: { id: string; save: boolean }) => {
      return save ? saveAlbum(id) : removeAlbum(id);
    },
    onMutate: ({ id, save }: { id: string; save: boolean }) => {
      save
        ? toast("Added to Your Library")
        : toast("Removed from Your Library");
      setIsLiked(save);
    },
    onError: (error, variables) => {
      toast("Something went wrong");
      setIsLiked(!variables.save);
    },
    onSettled: async () => {
      const checkIsLiked = await isSavedAlbum(id);
      if (checkIsLiked) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      queryClient.invalidateQueries({ queryKey: ["library-albums"] });
    },
  });

  const handleSave = () => {
    if (!user) {
      toast("You need to login first");
      return;
    }
    saveAlbumMutation.mutate({ id, save: !isLiked });
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
        onClick={handleSave}
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
