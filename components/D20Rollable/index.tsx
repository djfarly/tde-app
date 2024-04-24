import { D20Value } from "@/lib/dice";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import "./D20Rollable.css";
import { cn } from "@/lib/utils";

const ATTRIBUTE_IDS = {
  1: "COU",
  2: "SGC",
  3: "INT",
  4: "CHA",
  5: "DEX",
  6: "AGI",
  7: "CON",
  8: "STR",
} as const;

const sideVariants = {
  "1": {
    rotateY: "-50deg",
    rotateX: "-38deg",
    rotateZ: "35deg",
  },
  "2": {
    rotateY: "170deg",
    rotateX: "5deg",
    rotateZ: "-60deg",
  },
  "3": {
    rotateY: "-144deg",
    rotateX: "-8deg",
    rotateZ: "-6deg",
  },
  "4": {
    rotateY: "76deg",
    rotateX: "135deg",
    rotateZ: "-62deg",
  },
  "5": {
    rotateY: "118deg",
    rotateX: "-53deg",
    rotateZ: "-35deg",
  },
  "6": {
    rotateY: "-75deg",
    rotateX: "135deg",
    rotateZ: "65deg",
  },
  "7": {
    rotateY: "-37deg",
    rotateX: "187deg",
    rotateZ: "185deg",
  },
  "8": {
    rotateY: "-50deg",
    rotateX: "-153deg",
    rotateZ: "75deg",
  },
  "9": {
    rotateY: "-73deg",
    rotateX: "-175deg",
    rotateZ: "15deg",
  },
  "10": {
    rotateY: "51deg",
    rotateX: "-42deg",
    rotateZ: "-41deg",
  },
  "11": {
    rotateY: "-50deg",
    rotateX: "-220deg",
    rotateZ: "-37deg",
  },
  "12": {
    rotateY: "-10deg",
    rotateX: "-4deg",
    rotateZ: "-120deg",
  },
  "13": {
    rotateY: "35deg",
    rotateX: "4deg",
    rotateZ: "-177deg",
  },
  "14": {
    rotateY: "-296deg",
    rotateX: "72deg",
    rotateZ: "30deg",
  },
  "15": {
    rotateY: "-238deg",
    rotateX: "129deg",
    rotateZ: "40deg",
  },
  "16": {
    rotateY: "-254deg",
    rotateX: "-136deg",
    rotateZ: "113deg",
  },
  "17": {
    rotateY: "-37deg",
    rotateX: "8deg",
    rotateZ: "175deg",
  },
  "18": {
    rotateY: "-50deg",
    rotateX: "25deg",
    rotateZ: "288deg",
  },
  "19": {
    rotateY: "-72deg",
    rotateX: "4deg",
    rotateZ: "352deg",
  },
  "20": {
    rotateY: "50deg",
    rotateX: "-220deg",
    rotateZ: "38deg",
  },
  initial0: {
    rotateY: "-984.37deg",
    rotateX: "-666.26deg",
    rotateZ: "-701.33deg",
  },
  initial1: {
    rotateY: "-376.85deg",
    rotateX: "-654.55deg",
    rotateZ: "-506.88deg",
  },
  initial2: {
    rotateY: "-745.20deg",
    rotateX: "-534.11deg",
    rotateZ: "-673.62deg",
  },
};

const d20Variants = cva("*:bg-gradient-to-br text-black", {
  variants: {
    attribute: {
      COU: "*:from-red-200 *:to-red-300",
      SGC: "*:from-purple-200 *:to-purple-300",
      INT: "*:from-lime-200 *:to-lime-300",
      CHA: "*:from-stone-200 *:to-stone-300",
      DEX: "*:from-yellow-200 *:to-yellow-300",
      AGI: "*:from-sky-200 *:to-sky-300",
      CON: "*:from-white *:to-stone-100",
      STR: "*:from-orange-200 *:to-orange-300",
    },
  },
  defaultVariants: {
    attribute: "SGC",
  },
});

export interface D20RollableProps extends VariantProps<typeof d20Variants> {
  side?: D20Value;
  attributeId?: keyof typeof ATTRIBUTE_IDS;
  dieIndex?: 0 | 1 | 2;
}

const sides = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
] as const;

export function D20Rollable({
  attribute,
  attributeId,
  side,
  dieIndex,
}: D20RollableProps) {
  return (
    <div className="d20-wrapper">
      <section className="d20-container">
        <motion.div
          className={d20Variants({
            className: cn(`d20`, side === undefined ? "initial" : undefined),
            attribute:
              attribute ??
              (attributeId !== undefined
                ? ATTRIBUTE_IDS[attributeId]
                : undefined),
          })}
          style={{
            z: -60,
          }}
          initial={"initial" + (dieIndex ?? 0)}
          transformTemplate={({ rotateX, rotateY, rotateZ, z }) => {
            return `translateZ(${z}) rotateY(${rotateY}) rotateX(${rotateX}) rotateZ(${rotateZ})`;
          }}
          variants={sideVariants}
          animate={side ? side.toString() : "initial" + (dieIndex ?? 0)}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 50,
            mass: 0.5,
            restDelta: 0.01,
          }}
        >
          {sides.map((s) => (
            <figure
              key={s}
              className={cn(
                `face${s}`,
                s === "20" ? "text-red-900" : undefined,
                s === "1" ? "text-green-900" : undefined
              )}
            >
              {s}
            </figure>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
