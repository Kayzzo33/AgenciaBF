import React from "react";
import { cn } from "../../utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  const variants = {
    default: "border-transparent bg-black text-white hover:bg-black/80",
    secondary: "border-transparent bg-brand-yellow text-black hover:bg-brand-yellow/80",
    outline: "text-black border-black",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};