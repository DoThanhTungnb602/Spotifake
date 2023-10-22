import { Button } from "@/components/ui/button";
import { startPlayback } from "@/lib/player";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { GrPlayFill } from "react-icons/gr";

export function BtnPlay({
  uri,
  className,
}: {
  uri: string;
  className?: string;
}) {
  const startOrResumePlaybackMutation = useMutation({
    mutationFn: () => startPlayback(undefined, uri),
  });

  function handleOnPlay() {
    startOrResumePlaybackMutation.mutate();
  }
  return (
    <Button
      onClick={handleOnPlay}
      className={cn(
        "text-black bg-spotifake rounded-full p-0 w-12 h-12 hover:scale-110 transition-all hover:bg-spotifake text-lg shadow-lg",
        className,
      )}
    >
      <GrPlayFill className="ml-[2px]" />
    </Button>
  );
}
