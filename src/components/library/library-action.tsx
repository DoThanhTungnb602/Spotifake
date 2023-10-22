import { useSidebarStore } from "@/hooks/use-sidebar-store";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { BiLibrary } from "react-icons/bi";
import { BsFillCollectionFill } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";

export function LibraryAction() {
  const expand = useSidebarStore((state) => state.expand);
  const toggleExpand = useSidebarStore((state) => state.toggle);
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex grow-0 px-2 pt-2",
        expand ? "justify-between" : "justify-center",
      )}
    >
      {expand ? (
        <Button className="text-md p-1 text-zinc-400 hover:text-white transition bg-transparent hover:bg-transparent">
          <BiLibrary className="w-7 h-7 mr-2" />
          <span>Your Library</span>
        </Button>
      ) : (
        <ActionTooltip label="Expand your library" side="right" align="end">
          <Button
            className="text-md p-1 text-zinc-400 hover:text-white transition bg-transparent hover:bg-transparent"
            onClick={toggleExpand}
          >
            <BiLibrary className="w-7 h-7" />
          </Button>
        </ActionTooltip>
      )}

      {expand && (
        <div className="flex gap-2">
          <ActionTooltip
            label="Open your collections"
            align="center"
            side="top"
          >
            <Button
              className="bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition w-10 h-10 p-0"
              onClick={() => navigate("/collection/playlists")}
            >
              <BsFillCollectionFill className="w-6 h-6" />
            </Button>
          </ActionTooltip>
          <ActionTooltip label="Collapse" side="top" align="center">
            <Button
              className="bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition w-10 h-10 p-0"
              onClick={toggleExpand}
            >
              <IoMdArrowBack className="w-6 h-6" />
            </Button>
          </ActionTooltip>
        </div>
      )}
    </div>
  );
}
