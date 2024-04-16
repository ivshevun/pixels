"use client";
import { Shot } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import ShotsGrid from "./[username]/components/ShotsGrid";
import ShotsLoading from "./components/MainPage/ShotsLoading";
import ShotCard from "./components/ShotCard/ShotCard";
import ShotUserInfo from "./components/ShotCard/UserInfo";
import useShots from "./hooks/useShots";

interface Page {
  shots: Shot[];
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

  if (isLoading) return <ShotsLoading />;

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
