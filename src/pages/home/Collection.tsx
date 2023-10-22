import { cn } from "@/lib/utils";
import { Outlet, useLocation } from "react-router-dom";

export function Collection() {
  const { pathname } = useLocation();

  return (
    <section
      className={cn(
        "flex flex-col gap-5",
        pathname !== "/collection/tracks" && "px-5 pt-20"
      )}
    >
      {pathname !== "/collection/tracks" && (
        <p className="text-white text-3xl font-semibold capitalize">
          {pathname.split("/")[2]}
        </p>
      )}
      <Outlet />
    </section>
  );
}
