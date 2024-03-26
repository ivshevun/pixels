"use client";
import { ButtonProps } from "@/app/interfaces/ButtonProps";
import classNames from "classnames";

export default function TransparentButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  const styles = classNames(
    "border rounded-full text-sm hover:border-gray-300 transition-colors font-semibold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:text-gray-400 disabled:hover:bg-gray-50",
    className
  );

  return (
    <button className={styles} {...rest}>
      {children}
    </button>
  );
}
