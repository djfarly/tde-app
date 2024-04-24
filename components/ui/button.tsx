"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "./tooltip";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background group/button",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        lg: "h-12 px-7 text-sm md:h-14 md:px-7 md:text-base",
        md: "h-12 px-7 text-sm",
        sm: "h-9 px-4 text-sm",
      },
      aspect: {
        none: "",
        square: "px-0 md:px-0 aspect-square",
        narrow: "px-1 md:px-1",
      },
      rounded: {
        md: "rounded-md",
        full: "rounded-full",
      },
      shadow: {
        none: "",
        lg: "shadow-lg hover:shadow-xl transition-all",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        aspect: "square",
        className: "border border-transparent hover:border-secondary",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      aspect: "none",
      rounded: "md",
      shadow: "none",
    },
  }
);

export interface WithTooltipProps {
  tooltip?: React.ReactNode;
  isDarkTooltip?: boolean;
  TooltipProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Tooltip>,
    "children"
  >;
  TooltipTriggerProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TooltipTrigger>,
    "asChild" | "children"
  >;
  TooltipContentProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TooltipContent>,
    "children"
  >;
  TooltipPortalProps?: Omit<
    React.ComponentPropsWithoutRef<typeof TooltipPortal>,
    "children"
  >;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    WithTooltipProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      aspect,
      rounded,
      shadow,
      asChild = false,
      tooltip,
      isDarkTooltip,
      TooltipProps,
      TooltipTriggerProps,
      TooltipContentProps,
      TooltipPortalProps,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const button = (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            aspect,
            rounded,
            shadow,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );

    if (tooltip) {
      return (
        <Tooltip {...TooltipProps}>
          <TooltipTrigger {...TooltipTriggerProps} asChild>
            {button}
          </TooltipTrigger>
          <TooltipPortal {...TooltipPortalProps}>
            <div className={cn("contents", { dark: isDarkTooltip })}>
              <TooltipContent {...TooltipContentProps}>
                {tooltip}
              </TooltipContent>
            </div>
          </TooltipPortal>
        </Tooltip>
      );
    }

    return button;
  }
);
Button.displayName = "Button";

export interface LinkButtonProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof buttonVariants>,
    WithTooltipProps {
  disabled?: boolean;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant,
      size,
      aspect,
      rounded,
      shadow,
      disabled,
      tooltip,
      isDarkTooltip,
      TooltipProps,
      TooltipTriggerProps,
      TooltipContentProps,
      TooltipPortalProps,
      ...props
    },
    ref
  ) => {
    const linkButton = (
      <Link
        className={cn(
          "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
          buttonVariants({
            variant,
            size,
            aspect,
            rounded,
            shadow,
            className,
          })
        )}
        data-disabled={disabled ? "" : undefined}
        tabIndex={disabled ? -1 : undefined}
        ref={ref}
        {...props}
      />
    );

    if (tooltip && !disabled) {
      return (
        <Tooltip {...TooltipProps}>
          <TooltipTrigger {...TooltipTriggerProps} asChild>
            {linkButton}
          </TooltipTrigger>
          <TooltipPortal {...TooltipPortalProps}>
            <div className={cn("contents", { dark: isDarkTooltip })}>
              <TooltipContent {...TooltipContentProps}>
                {tooltip}
              </TooltipContent>
            </div>
          </TooltipPortal>
        </Tooltip>
      );
    }

    return linkButton;
  }
);
LinkButton.displayName = "LinkButton";

export { Button, LinkButton, buttonVariants };
