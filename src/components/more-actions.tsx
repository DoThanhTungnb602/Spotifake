"use client";

import { FiMoreHorizontal } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MoreActions({ className }: { className?: string }) {
  return (
    <div className={cn(className ?? "")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent text-text-blur hover:text-white transition rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 p-0">
            <FiMoreHorizontal className="w-7 h-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-[#282828]">
          <DropdownMenuGroup>
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
