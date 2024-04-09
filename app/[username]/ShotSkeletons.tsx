import { Flex, Skeleton } from "@radix-ui/themes";

export default function ShotSkeleton() {
  return (
    <Flex direction="column" className="w-96 md:w-80 h-96">
      <Skeleton className="rounded-lg w-full h-80" />
      <Flex align="center" justify="between" className="pt-2 px-2">
        <UserSkeleton />
        <Flex gap="2" align="center">
          <MiniSkeleton />
          <MiniSkeleton />
        </Flex>
      </Flex>
    </Flex>
  );
}

export const UserSkeleton = () => {
  return (
    <Flex gap="2">
      <Skeleton className="rounded-full w-6 h-6" />
      <Skeleton className="w-16 h-6" />
    </Flex>
  );
};

const MiniSkeleton = () => {
  return (
    <Flex gap="1" align="center">
      <Skeleton className="w-6 h-6" />
      <Skeleton className="w-6 h-4" />
    </Flex>
  );
};
