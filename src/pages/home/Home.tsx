import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSidebarStore } from "@/hooks/use-sidebar-store";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "sonner";

import SideBar from "@/components/sidebar";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import PlayingView from "@/components/playing-view";
import StatusBar from "@/components/status-bar/status-bar";
import { cn } from "@/lib/utils";

export default function Home() {
  const [user] = useLocalStorage("user");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const expand = useSidebarStore((state) => state.expand);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [pathname]);

  function handleMediaQueryChange(mediaQuery: MediaQueryListEvent) {
    if (!mediaQuery.matches) {
      useSidebarStore.setState({ expand: false });
    }
  }

  return (
    <div
      className={cn(
        "bg-black p-2 w-screen h-screen grid relative grid-rows-[128px_1fr_84px] gap-2",
        expand ? "grid-cols-[280px_1fr]" : "grid-cols-[72px_1fr]"
      )}
    >
      <SideBar />
      <main className="col-span-1 row-span-2 flex gap-3 relative main">
        <ScrollArea
          className="flex flex-col bg-bg rounded-md justify-between shadow-2xl flex-1"
          ref={scrollAreaRef}
        >
          <Navbar />
          <Outlet />
          <Toaster
            position="bottom-center"
            richColors
            toastOptions={{
              style: {
                background: "#282828",
                border: "none",
                color: "#fff",
              },
              duration: 1500,
            }}
            offset={130}
          />
          <Footer />
        </ScrollArea>
        <PlayingView />
      </main>
      {user ? (
        <StatusBar />
      ) : (
        <div className="col-span-2 row-span-1 bg-rose-400 rounded-sm" />
      )}
    </div>
  );
}
