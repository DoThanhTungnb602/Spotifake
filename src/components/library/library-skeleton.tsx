import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarStore } from "@/hooks/use-sidebar-store";
import { cn } from "@/lib/utils";

export function LibrarySkeleton({
  type,
}: {
  type?: "artist" | "album" | "playlist";
}) {
  const expand = useSidebarStore((state) => state.expand);

  return (
    <div className="flex gap-2 items-center hover:bg-[#1A1A1A] transition rounded-md p-2">
      <Skeleton
        className={cn(
          "w-12 h-12 ",
          type === "artist" ? "rounded-full" : "rounded-md",
        )}
      />
      {expand && (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-40 h-4" />
        </div>
      )}
    </div>
  );
}
