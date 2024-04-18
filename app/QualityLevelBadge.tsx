"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatAsPercentage } from "./Sheet";
import { cva, VariantProps } from "class-variance-authority";
import { Badge, BadgeProps } from "@/components/ui/badge";

const qualityLevelBadgeVariants = cva(
  "text-white tabular-nums [word-spacing:0.25ch] ring-1 ring-offset-0",
  {
    variants: {
      level: {
        0: "bg-slate-200 ring-slate-100",
        1: "bg-emerald-500 ring-emerald-400",
        2: "bg-cyan-500 ring-cyan-400",
        3: "bg-sky-500 ring-sky-400",
        4: "bg-indigo-500 ring-indigo-400",
        5: "bg-purple-500 ring-purple-400",
        6: "bg-pink-500 ring-pink-400",
      } as Record<number, string>,
    },
    defaultVariants: {
      level: 1,
    },
  }
);

export interface QualityLevelBadgeProps
  extends VariantProps<typeof qualityLevelBadgeVariants>,
    BadgeProps {}

export function QualityLevelBadge({
  className,
  level,
  ...props
}: QualityLevelBadgeProps) {
  return (
    <Badge
      className={qualityLevelBadgeVariants({ level, className })}
      {...props}
    />
  );
}
