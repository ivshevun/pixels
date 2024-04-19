import { Flex, Skeleton } from "@radix-ui/themes";
import React from "react";

export default function CommentSkeleton() {
  return (
    <Flex gap="2">
      <Skeleton className="h-7 w-7 rounded-full" />
      <Flex direction="column" gap="1">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-5 w-14" />
      </Flex>
    </Flex>
  );
}
