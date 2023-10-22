import { useLocalStorage } from "@uidotdev/usehooks";
import { useLocation } from "react-router-dom";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { AuthActions } from "@/components/navbar/auth-actions";
import { UserActions } from "@/components/navbar/user-actions";

import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [user] = useLocalStorage("user");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-between items-center px-5 bg-violet-800/70 absolute left-0 right-0 top-0 py-3 z-50">
      <div className="flex gap-2">
        <ActionTooltip label="Go back" align="center" side="bottom">
          <Button
            className="text-xl rounded-full h-10 w-10 p-0 bg-[#000000]/70 text-white hover:bg-[#000000]/70"
            onClick={() => {
              navigate(-1);
            }}
          >
            <BsChevronLeft />
          </Button>
        </ActionTooltip>
        <ActionTooltip label="Go forward" align="center" side="bottom">
          <Button
            className="text-xl rounded-full h-10 w-10 p-0 bg-[#000000]/70 text-white hover:bg-[#000000]/70"
            onClick={() => {
              navigate(1);
            }}
          >
            <BsChevronRight />
          </Button>
        </ActionTooltip>

        {pathname.split("/")[1] === "collection" && (
          <div className="flex gap-2 ml-6">
            <Button
              className={cn(
                pathname !== "/collection/playlists" &&
                  "bg-transparent text-white hover:bg-transparent",
              )}
              onClick={() => navigate("/collection/playlists")}
            >
              <p className="font-semibold">Playlists</p>
            </Button>
            <Button
              className={cn(
                pathname !== "/collection/tracks" &&
                  "bg-transparent text-white hover:bg-transparent",
              )}
              onClick={() => navigate("/collection/tracks")}
            >
              <p className="font-semibold">Tracks</p>
            </Button>
            <Button
              className={cn(
                pathname !== "/collection/artists" &&
                  "bg-transparent text-white hover:bg-transparent",
              )}
              onClick={() => navigate("/collection/artists")}
            >
              <p className="font-semibold">Artists</p>
            </Button>
            <Button
              className={cn(
                pathname !== "/collection/albums" &&
                  "bg-transparent text-white hover:bg-transparent",
              )}
              onClick={() => navigate("/collection/albums")}
            >
              <p className="font-semibold">Albums</p>
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {user ? <UserActions /> : <AuthActions />}
      </div>
    </nav>
  );
}
