import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ILibraryActiveView } from "@/type";

export function LibraryPresentationItem({
  label,
  active,
  onActiveChange,
}: {
  label: ILibraryActiveView;
  active: ILibraryActiveView;
  onActiveChange: (name: ILibraryActiveView) => void;
}) {
  return (
    <Button
      className={cn(
        "rounded-full inline-block text-xs h-8 whitespace-nowrap",
        active === label
          ? "bg-white text-black"
          : "bg-[#232323] hover:bg-[#2A2A2A] text-white",
      )}
      onClick={() => onActiveChange(label)}
    >
      {label}
    </Button>
  );
}
