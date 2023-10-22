import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useSidebarStore } from "@/hooks/use-sidebar-store";

import { LibraryAction } from "./library-action";
import { LibraryList } from "./library-list";
import { LibraryPresentation } from "./library-presentation";
import { cn } from "@/lib/utils";

import { AiFillEyeInvisible } from "react-icons/ai";
import { ILibraryActiveView } from "@/type";

export function Library() {
  const [user] = useLocalStorage("user");
  const [active, setActive] = useState<ILibraryActiveView>("Playlists");
  const expand = useSidebarStore((state) => state.expand);

  function handleActiveChange(name: typeof active) {
    setActive(name);
  }

  return (
    <div
      className={cn(
        "rounded-md w-full h-[calc(100%-9rem+8px)] bg-bg flex flex-col pt-2 shadow-2xl",
        expand ? "gap-5 px-2" : "gap-1 px-1",
      )}
    >
      <LibraryAction />
      {expand && (
        <LibraryPresentation
          active={active}
          onActiveChange={handleActiveChange}
        />
      )}
      {user ? (
        <LibraryList active={active} />
      ) : expand ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-3">Your Library is empty</h2>
          <p className="text-sm text-center">
            Login to see your playlists, saved songs, and more.
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <AiFillEyeInvisible className="text-spotifake text-center w-6 h-6" />
        </div>
      )}
    </div>
  );
}
