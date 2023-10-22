import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Button } from "@/components/ui/button";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { LibraryPresentationItem } from "@/components/library/library-presentation-item";
import { ILibraryActiveView } from "@/type";

export function LibraryPresentation({
  active,
  onActiveChange,
}: {
  active: ILibraryActiveView;
  onActiveChange: (name: typeof active) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollPoint, setScrollPoint] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [user] = useLocalStorage("user");

  const activeType: ILibraryActiveView[] = [
    "Playlists",
    "Artists",
    "Albums",
    "Saved Tracks",
    "Podcasts",
    "Shows",
  ];

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!isDragging) return;
      event.preventDefault();
      const x = event.pageX - containerRef.current!.offsetLeft;
      const walk = x - startX;
      containerRef.current!.scrollLeft = scrollLeft - walk;
      setScrollPoint(containerRef.current!.scrollLeft);
    }
    function handleMouseUp() {
      if (!isDragging) return;
      setIsDragging(false);
    }
    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseUp);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  function handleSlideNext() {
    containerRef.current?.scrollTo({
      left:
        containerRef.current?.scrollWidth - containerRef.current?.clientWidth,
      behavior: "smooth",
    });
    setScrollPoint(
      containerRef.current!.scrollWidth - containerRef.current!.clientWidth,
    );
  }

  function handleSlidePrev() {
    containerRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
    setScrollPoint(0);
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(true);
    setStartX(event.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  }

  return (
    <>
      {user && (
        <div className="relative px-2 grow-0">
          <div
            className="flex gap-2 relative overflow-x-scroll no-scrollbar"
            ref={containerRef}
            onMouseDown={handleMouseDown}
          >
            {activeType.map((item) => (
              <LibraryPresentationItem
                key={item}
                onActiveChange={onActiveChange}
                active={active}
                label={item}
              />
            ))}
          </div>

          {scrollPoint !== 0 && (
            <Button
              onClick={handleSlidePrev}
              className="p-0 m-0 h-8 w-8 transition-all rounded-full bg-[#242424] hover:bg-[#2A2A2A] hover:text-white text-zinc-400 absolute left-0 top-0 btn-shadow"
            >
              <BsChevronLeft className="w-6 h-6 pr-[2px]" />
            </Button>
          )}
          {((containerRef.current &&
            scrollPoint !==
              containerRef.current!.scrollWidth -
                containerRef.current?.clientWidth) ||
            !containerRef.current) && (
            <Button
              onClick={handleSlideNext}
              className="p-0 m-0 h-8 w-8 transition-all rounded-full bg-[#242424] hover:bg-[#2A2A2A] hover:text-white text-zinc-400 absolute right-0 top-0 btn-shadow"
            >
              <BsChevronRight className="w-6 h-6 pl-[2px]" />
            </Button>
          )}
        </div>
      )}
    </>
  );
}
