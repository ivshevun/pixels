import { Flex, Skeleton } from "@radix-ui/themes";
import React from "react";

export default function MessageSkeleton() {
  return (
    <Flex
      align="center"
      justify="between"
      className="border p-4 *:h-6 rounded-lg"
      gap="4"
    >
      <Skeleton className="w-10 " />
      <Skeleton className="flex-1" />
      <Flex align="center" gap="4" className="*:h-6">
        <Skeleton className="w-10" />
        <Skeleton className="w-5" />
      </Flex>
    </Flex>
  );
}
