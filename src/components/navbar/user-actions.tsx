import { useLocalStorage } from "@uidotdev/usehooks";

import { FaRegUser } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function UserActions() {
  const [, saveUser] = useLocalStorage("user");
  const [, saveCredentials] = useLocalStorage("credentials");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-[#282828] text-white hover:bg-[#3E3E3E] transition"
        >
          <FaRegUser className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-[#282828]">
        <DropdownMenuItem
          onClick={() => {
            saveUser(null);
            saveCredentials(null);
            window.location.reload();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
