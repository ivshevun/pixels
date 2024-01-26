import { Text } from "@radix-ui/themes";
import classnames from "classnames";
import { MouseEventHandler, PropsWithChildren } from "react";

type AllowedAsValues = "div" | "label" | "p" | "span";

interface TextProps extends PropsWithChildren {
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  href?: string;
  as?: AllowedAsValues;
  asChild?: boolean;
}

export default function SmallText({
  children,
  className,
  as = "span",
  ...rest
}: TextProps) {
  // mix styles
  const styles = classnames("text-sm text-gray-400", className);

  return (
    <Text className={styles} {...rest}>
      {children}
    </Text>
  );
}
