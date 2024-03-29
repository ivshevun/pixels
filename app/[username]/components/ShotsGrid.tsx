import { Flex, Grid } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

export default function ShotsGrid({ children }: PropsWithChildren) {
  return (
    <Flex justify={{ initial: "center", lg: "start" }}>
      <Grid columns={{ initial: "1", md: "2", lg: "3", xl: "4" }} gap="9">
        {children}
      </Grid>
    </Flex>
  );
}
