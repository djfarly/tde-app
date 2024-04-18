import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-medium transition-colors", // focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground", // hover:bg-primary/80
        secondary: "border-transparent bg-secondary text-secondary-foreground", // hover:bg-secondary/80
        destructive:
          "border-transparent bg-destructive text-destructive-foreground", // hover:bg-destructive/80
        outline: "text-foreground",
      },
      size: {
        sm: "text-xs h-5 px-2.5",
        md: "text-sm h-6 px-3",
        lg: "text-base h-8 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, size, asChild, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
