"use client";
import { Flex, Text } from "@radix-ui/themes";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import ShotsGrid from "./[username]/components/ShotsGrid";
import ShotsLoading from "./components/MainPage/ShotsLoading";
import ShotCard, { Shot } from "./components/ShotCard/ShotCard";
import ShotUserInfo from "./components/ShotCard/UserInfo";
import useShots from "./hooks/useShots";
import classNames from "classnames";

export interface Page {
  shots: Shot[];
  shotCount: number;
  hasNextPage: boolean;
}

export default function InfiniteFeed({ className }: { className?: string }) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  }: UseInfiniteQueryResult<InfiniteData<Page, unknown>, Error> = useShots();

  if (isLoading) return <ShotsLoading />;

  const fetchedShotsCount = data?.pages.reduce(
    (total, page) => total + page.shots.length,
    0
  );

  const gridStyles = classNames("px-8 pb-16 overflow-hidden", className);

  return (
    <InfiniteScroll
      dataLength={fetchedShotsCount || 0}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Loader />}
      endMessage={<EndMessage />}
      className="overflow-hidden"
    >
      <ShotsGrid className={gridStyles}>
        {data?.pages.map((page) =>
          page.shots.map((shot) => (
            <ShotCard key={shot.id} shot={shot}>
              <ShotUserInfo userId={shot.userId} />
            </ShotCard>
          ))
        )}
      </ShotsGrid>
    </InfiniteScroll>
  );
}

export const Loader = () => {
  return (
    <Flex justify="center" align="center" className="py-4" gap="2">
      <ClipLoader color="purple" />
      <Text className="text-gray-500 text-sm">Loading more...</Text>
    </Flex>
  );
};

export const EndMessage = () => {
  return (
    <Flex justify="center" className="text-center text-sm text-zinc-600 pt-8">
      You’ve reached the end of the list
    </Flex>
  );
};
