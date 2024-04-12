import { Flex, Grid } from "@radix-ui/themes";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function ShotsGrid({ children, className }: Props) {
  const styles = classNames("justify-center", className);

  return (
    <Flex className={styles}>
      <Grid columns={{ initial: "1", md: "2", lg: "3", xl: "4" }} gap="9">
        {children}
      </Grid>
    </Flex>
  );
}
