"use client";
import { EndMessage, Loader, Page } from "@/app/InfiniteFeed";
import ShotsGrid from "@/app/[username]/components/ShotsGrid";
import ShotsLoading from "@/app/components/MainPage/ShotsLoading";
import ShotCard from "@/app/components/ShotCard/ShotCard";
import ShotUserInfo from "@/app/components/ShotCard/UserInfo";
import useShotsByQuery from "@/app/hooks/useShotsByQuery";
import { changeSearchQuery } from "@/lib/redux/features/search/searchSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NoShots } from "../components/NoShots";

export interface ParamsProps {
  params: {
    query: string;
  };
}

export default function SearchResultPage({ params: { query } }: ParamsProps) {
  const dispatch = useAppDispatch();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  }: UseInfiniteQueryResult<
    InfiniteData<Page, unknown>,
    Error
  > = useShotsByQuery(query);

  // when the page loads, set the search query in input to the query from the params
  useEffect(() => {
    dispatch(changeSearchQuery(query));
  }, [dispatch, query]);

  if (isLoading) return <ShotsLoading />;

  const fetchedShotsCount = data?.pages.reduce(
    (total, page) => total + page.shots.length,
    0
  );

  if (fetchedShotsCount === 0) return <NoShots />;

  return (
    <InfiniteScroll
      dataLength={fetchedShotsCount || 0}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Loader />}
      endMessage={<EndMessage />}
      className="overflow-hidden"
    >
      <ShotsGrid className="px-8 pt-16 md:pt-8 pb-16 overflow-hidden">
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
