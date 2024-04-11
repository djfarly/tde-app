"use client";
import { calculateChance } from "@/lib/skillCheck";
import { QualityLevelMeter } from "./QualityLevelMeter";

// const Attribute = memo(function Attribute({
//   attributeId,
// }: {
//   attributeId: number;
// }) {
//   const value = getAttributeValue(attributeId);
//   return (
//     <Tooltip>
//       <TooltipTrigger className="font-mono inline-flex flex-col">
//         {attributes.find(({ id }) => id === attributeId)!.shorthand[locale]}
//         {/* <span className="text-slate-500">{value}</span> */}
//       </TooltipTrigger>
//       <TooltipContent>
//         {attributes.find(({ id }) => id === attributeId)!.name[locale]} –{" "}
//         {value}
//       </TooltipContent>
//     </Tooltip>
//   );
// });
// Attribute.displayName = "Attribute";
export function Chance({
  attributes,
  skillPoints,
  modifier = 0,
}: {
  attributes: [number, number, number];
  skillPoints: number;
  modifier?: number;
}) {
  const [chance, qualityLevelChances] = calculateChance(
    attributes,
    skillPoints,
    modifier
  );

  return (
    <QualityLevelMeter
      chance={chance}
      qualityLevelChances={qualityLevelChances}
    />
  );
}
