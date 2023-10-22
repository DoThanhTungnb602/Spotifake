import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align: "start" | "center" | "end";
  className?: string;
}

export function ActionTooltip({
  label,
  children,
  side,
  align,
  className,
}: ActionTooltipProps) {
  return (
    <div className={cn(className ?? "")}>
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            side={side}
            align={align}
            className="shadow shadow-gray-900"
          >
            <p className="">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
