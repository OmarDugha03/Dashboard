import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const textVariants = cva("text-slate-900 dark:text-slate-100 ", {
  variants: {
    size: {
      head: " font-black text-3xl lg:text-5xl ",
      p: "text-xl font-medium",
      md: "text-md ",
    },
  },
  defaultVariants: {
    size: "p",
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p ref={ref} {...props} className={cn(textVariants({ size, className }))}>
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";

export default Text;
