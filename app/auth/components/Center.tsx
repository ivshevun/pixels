import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { PropsWithChildren } from "react";

interface CenterProps extends PropsWithChildren {
  className?: string;
}

export function Center({ children, className }: CenterProps) {
  const styles = classNames("mx-auto px-8", className);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      key="form-wrapper"
      className={styles}
    >
      {children}
    </Flex>
  );
}

export function CenterResponsive({ children, className }: CenterProps) {
  const styles = classNames("md:w-1/2 lg:w-1/3", className);

  return <Center className={styles}>{children}</Center>;
}
