"use client";
import { useProfileShots } from "@/lib/redux/features/profileShots/hooks";
import noResults from "@/public/assets/no-shots.jpg";
import { Shot, User } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import ShotCard from "../components/ShotCard/ShotCard";
import ShotUserInfo from "../components/ShotCard/UserInfo";
import useUserShots from "../hooks/useUserShots";
import NoShots from "./NoShots";
import ShotSkeleton from "./ShotSkeletons";
import ShotsGrid from "./components/ShotsGrid";
import FirstShot from "./components/FirstShot";

interface Page {
  shots: Shot[];
  shotCount: number;
  hasNextPage: boolean;
}

export default function UserShots({ user }: { user: User }) {
  const { data: session } = useSession();
  const { sortBy } = useProfileShots();

  const orderBy = sortBy === "Recent shots" ? "recent" : "popular";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  }: UseInfiniteQueryResult<InfiniteData<Page, unknown>, Error> = useUserShots(
    user.id,
    orderBy
  );

  if (isLoading)
    return (
      <ShotsGrid>
        {Array.from(Array(12).keys()).map((num) => (
          <ShotSkeleton key={num} />
        ))}
      </ShotsGrid>
    );

  if (isError)
    return (
      <NoShots
        imageSource={noResults}
        heading="No shots :("
        message={`It looks like ${
          user.username || user.name
        } hasn’t uploaded any shots yet. Check back soon!`}
        isSmall={true}
      />
    );

  // it does not change when page changes
  const totalCount = data?.pages[0].shotCount;

  if (totalCount === 0 && user.id === session?.user.id) return <FirstShot />;

  if (totalCount === 0 && user.id !== session?.user.id)
    return (
      <NoShots
        imageSource={noResults}
        heading="No shots :("
        message={`It looks like ${
          user.username || user.name
        } hasn’t uploaded any shots yet. Check back soon!`}
        isSmall={true}
      />
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
        <div className="flex justify-center pb-4">
          <ClipLoader color="purple" />
        </div>
      }
      endMessage={
        <Flex justify="center" className="text-center text-purple-500 pt-8">
          Oops! No more shots to load.
        </Flex>
      }
      className="overflow-hidden"
    >
      <ShotsGrid className="lg:justify-start overflow-hidden pb-14">
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
