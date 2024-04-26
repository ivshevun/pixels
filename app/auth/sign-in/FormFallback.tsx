import { Flex, Skeleton } from "@radix-ui/themes";

export default function FormFallback() {
  return (
    <Flex direction="column" className="gap-y-10 mt-10">
      <Flex direction="column" gap="1">
        <Skeleton className="w-10 h-5" />
        <Skeleton className="w-[400px] h-10" />
      </Flex>
      <Flex direction="column" gap="1">
        <Skeleton className="w-10 h-5" />
        <Skeleton className="w-[400px] h-10" />
      </Flex>
      <Flex direction="column" gap="1">
        <Skeleton className="w-[200px] h-10 self-center" />
        <Skeleton className="w-[100px] h-5 self-center" />
      </Flex>
    </Flex>
  );
}
