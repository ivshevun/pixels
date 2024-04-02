import { Flex, Skeleton } from "@radix-ui/themes";
import React from "react";

export default function ButtonsLoading() {
  return (
    <Flex align="center" gap="3">
      <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
      <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
      <Skeleton className="w-10 h-8 sm:w-28 sm:h-10 rounded-2xl sm:rounded-full" />
    </Flex>
  );
}
