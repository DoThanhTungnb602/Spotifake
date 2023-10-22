import { Navigation } from "@/components/navigation";
import { INavLink } from "@/type";
import { Library } from "./library/library";

const navLinks: INavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Search",
    href: "/search",
  },
];

export default function SideBar() {
  return (
    <div className="flex flex-col col-span-1 row-span-2 gap-2">
      <Navigation navLinks={navLinks} />
      <Library />
    </div>
  );
}
