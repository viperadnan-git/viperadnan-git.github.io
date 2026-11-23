import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md transition-[color,background-color,border-color,scale] duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // site text controls (no box): grey until hovered / ink with a faint underline
        quiet: "text-muted-foreground hover:text-foreground",
        underline:
          "text-foreground underline decoration-border decoration-1 underline-offset-[3px] hover:decoration-current",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 shrink-0 whitespace-nowrap",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5 shrink-0 whitespace-nowrap",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 shrink-0 whitespace-nowrap",
        icon: "size-9 shrink-0 whitespace-nowrap",
        "icon-xs":
          "size-6 rounded-md shrink-0 whitespace-nowrap [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 shrink-0 whitespace-nowrap",
        "icon-lg": "size-10 shrink-0 whitespace-nowrap",
        // sits in running text: wraps like text (long URLs break anywhere); invisible ::after keeps a >=24px hit area (WCAG 2.5.8)
        text: "relative [overflow-wrap:anywhere] after:absolute after:inset-x-[-8px] after:inset-y-[-4px] after:content-['']",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
