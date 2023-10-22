import { useSidebarStore } from "@/hooks/use-sidebar-store";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const iconMap = {
  Home: [GoHome, GoHomeFill],
  Search: [FiSearch, FiSearch],
};

type NavLink = {
  name: "Home" | "Search";
  href: string;
};

export function Navigation({ navLinks }: { navLinks: NavLink[] }) {
  const expand = useSidebarStore((state) => state.expand);

  return (
    <div
      className={cn(
        "bg-bg w-full h-32 rounded-md shrink-0 flex flex-col justify-around shadow-2xl",
        expand ? "p-3 items-start" : "p-1 items-center",
      )}
    >
      {navLinks.map((link, index) => {
        const Icon = iconMap[link.name][0];
        const IconFill = iconMap[link.name][1];

        return (
          <NavLink key={index} to={link.href}>
            {({ isActive }) => (
              <Button
                className={cn(
                  "bg-transparent text-lg text-zinc-400 hover:text-white transition hover:bg-transparent flex-shrink-0 flex gap-4",
                  isActive && "text-white",
                )}
              >
                {isActive ? (
                  <IconFill className="w-7 h-7" />
                ) : (
                  <Icon className="w-7 h-7" />
                )}
                {expand && <span>{link.name}</span>}
              </Button>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}
