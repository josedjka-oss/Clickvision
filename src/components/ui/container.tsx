import type { HTMLAttributes } from "react";
import type { ContainerWidth } from "@/types/ui.types";
import { cn } from "@/lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: ContainerWidth;
};

const widthClasses: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export const Container = ({
  className,
  width = "default",
  ...props
}: ContainerProps) => (
  <div
    className={cn(
      "mx-auto w-full max-w-full px-4 sm:px-6 lg:px-10",
      widthClasses[width],
      className,
    )}
    {...props}
  />
);
