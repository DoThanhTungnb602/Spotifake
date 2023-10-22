import { Skeleton } from "@/components/ui/skeleton";

export function HomePlaylistSkeleton() {
  return (
    <div className="rounded-md overflow-hidden flex justify-between items-center bg-[#b3b3b3]/20 min-w-[260px]">
      <div className="flex gap-3 items-center">
        <Skeleton className="w-[80px] h-[80px] rounded-none shadow-lg shadow-black/50" />
        <Skeleton className="w-[200px] h-[20px]" />
      </div>
    </div>
  );
}
