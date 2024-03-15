import { Text } from "@radix-ui/themes";
import classNames from "classnames";
import React from "react";

interface OptionProps {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
}

export default function ComboOption({
  children,
  className,
  onClick,
}: OptionProps) {
  const styles = classNames(
    "py-3 pl-4 text-sm text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer border-r",
    className
  );
  return (
    <Text onMouseDown={onClick} className={styles}>
      {children}
    </Text>
  );
}
