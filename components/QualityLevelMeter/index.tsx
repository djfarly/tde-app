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
import { formatAsPercentage } from "@/lib/format";
import { calculateChance } from "@/lib/skillCheck";
import { cn } from "@/lib/utils";

export function QualityLevelMeter({
  attributes,
  skillPoints,
  modifier = 0,
  isIncapacitated = false,
}: {
  attributes: [number, number, number];
  skillPoints: number;
  modifier?: number;
  isIncapacitated?: boolean;
}) {
  const [chance, qualityLevelChances] = isIncapacitated
    ? [0, [0, 0, 0, 0, 0, 0]]
    : calculateChance(attributes, skillPoints, modifier);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="meter"
          aria-valuenow={chance * 100}
          aria-valuetext={`${formatAsPercentage(chance)} Erfolgschance`}
          className="flex flex-row-reverse justify-end w-72 h-6 rounded-full overflow-clip bg-stone-200 shadow-sm data-[state*=open]:shadow-md transition-shadow gap-px"
        >
          {qualityLevelChances.map((chance, index) => {
            if (chance === 0) return null;
            return (
              <div
                key={index}
                className={cn(
                  "h-full overflow-clip flex items-center justify-end transition-all",
                  {
                    "bg-emerald-500": index === 0,
                    "bg-cyan-500": index === 1,
                    "bg-sky-500": index === 2,
                    "bg-indigo-500": index === 3,
                    "bg-purple-500": index === 4,
                    "bg-pink-500": index === 5,
                  }
                )}
                dir="rtl"
                style={{ width: `${chance * 100}%` }}
              >
                <span className="inline-block px-3 text-sm font-medium text-white truncate">
                  QS {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </TooltipTrigger>
      <TooltipContent className="p-0">
        <Table variant="compact">
          <TableHeader>
            <TableRow>
              <TableHead>Qualität</TableHead>
              <TableHead className="text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualityLevelChances
              .filter((chance) => chance > 0)
              .map((chance, index) => (
                <TableRow key={index}>
                  <TableCell>QS {index + 1}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatAsPercentage(chance)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Gesamt</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatAsPercentage(chance)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TooltipContent>
    </Tooltip>
  );
}
