"use client";
import { useProfileShots } from "@/lib/redux/features/profileShots/hooks";
import noResults from "@/public/assets/no-shots.jpg";
import { Shot, User } from "@prisma/client";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import ShotCard from "../components/ShotCard/ShotCard";
import ShotUserInfo from "../components/ShotCard/UserInfo";
import useUserShots from "../hooks/useUserShots";
import NoShots from "./NoShots";
import ShotSkeleton from "./ShotSkeletons";
import FirstShot from "./components/FirstShot";
import ShotsGrid from "./components/ShotsGrid";

export default function UserShots({ user }: { user: User }) {
  const { data: session } = useSession();
  const { sortBy } = useProfileShots();

  const orderBy = sortBy === "Recent shots" ? "recent" : "popular";

  const {
    data: response,
    isLoading,
    isError,
  }: UseQueryResult<AxiosResponse<Shot[], any>, Error> = useUserShots(
    user.id,
    orderBy
  );
  const shots = response?.data;

  if (isLoading)
    return (
      <ShotsGrid className="lg:justify-start">
        {[1, 2, 3, 4].map((num) => (
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

  if (shots?.length === 0 && user.id === session?.user.id) return <FirstShot />;

  if (shots?.length === 0 && user.id !== session?.user.id)
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

  return (
    <ShotsGrid className="lg:justify-start">
      {shots?.map((shot) => (
        <ShotCard key={shot.id} shot={shot}>
          <ShotUserInfo userId={user.id} />
        </ShotCard>
      ))}
    </ShotsGrid>
  );
}
