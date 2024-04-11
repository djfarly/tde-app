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
  "text-white tabular-nums [word-spacing:0.25ch]",
  {
    variants: {
      level: {
        0: "bg-slate-200",
        1: "bg-emerald-500",
        2: "bg-cyan-500",
        3: "bg-sky-500",
        4: "bg-indigo-500",
        5: "bg-purple-500",
        6: "bg-pink-500",
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
