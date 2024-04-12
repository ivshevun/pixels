"use client";
import { Shot } from "@prisma/client";
import ShotSkeleton from "./[username]/ShotSkeletons";
import ShotsGrid from "./[username]/components/ShotsGrid";
import ShotCard from "./components/ShotCard/ShotCard";
import ShotUserInfo from "./components/ShotCard/UserInfo";
import useShots from "./hooks/useShots";
import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import { Flex, Text } from "@radix-ui/themes";

interface Page {
  shots: Shot[];
  prevPage: number;
  shotCount: number;
  hasNextPage: boolean;
}

export default function Home() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  }: UseInfiniteQueryResult<InfiniteData<Page, unknown>, Error> = useShots();

  if (isLoading)
    return (
      <ShotsGrid className="mx-auto px-8 py-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <ShotSkeleton key={num} />
        ))}
      </ShotsGrid>
    );
  const fetchedShotsCount = data?.pages.reduce(
    (total, page) => total + page.shots.length,
    0
  );

  return (
    <InfiniteScroll
      dataLength={fetchedShotsCount || 0}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="flex justify-center py-4">
          <ClipLoader color="purple" />
        </div>
      }
      endMessage={
        <Flex justify="center" className="text-center text-purple-500 py-4">
          Oops! No more shots to load.
        </Flex>
      }
      className="overflow-hidden"
    >
      <ShotsGrid className="px-8 pt-4 pb-16 overflow-hidden">
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
