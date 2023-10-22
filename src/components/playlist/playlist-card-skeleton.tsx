import { Skeleton } from "@/components/ui/skeleton";

export function PlaylistCardSkeleton() {
  return (
    <div className="flex flex-col p-4 justify-center bg-[#282828]/30 hover:bg-[#282828] transition-all rounded-md group overflow-hidden">
      <Skeleton className="shadow-md object-cover shadow-black/50 aspect-square w-full rounded-md" />
      <Skeleton className="text-md font-semibold truncate mb-3 mt-5 h-5 w-3/4" />
      <Skeleton className="text-white/70 text-sm line-clamp-2 h-3 w-full mb-2" />
      <Skeleton className="text-white/70 text-sm line-clamp-2 h-3 w-4/5 mb-1" />
    </div>
  );
}
