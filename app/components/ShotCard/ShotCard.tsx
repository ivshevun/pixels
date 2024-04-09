"use client";
import useFavourited from "@/app/hooks/useFavourited";
import { fetchLiked } from "@/app/hooks/useLiked";
import removeTags from "@/app/utils/removeTags";
import { setFavourited } from "@/lib/redux/features/favourites/favouritesSlice";
import { useShotInfo } from "@/lib/redux/features/shotsLikes/hooks";
import { changeShotsLikes } from "@/lib/redux/features/shotsLikes/shotsLikesSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Tag } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import FavouriteContent from "./FavouriteContent";
import IconButton from "./IconButton";
import LikeContent from "./LikeContent";

export interface Shot {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  imageUrl: string;
  userId: string;
  likes: number;
  views: number;
}

export default function ShotCard({
  shot,
  userName,
  children,
}: {
  shot: Shot;
  userName: string;
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const predictedLikes = useShotInfo()[shot.id];

  const router = useRouter();
  const [isLikeLoading, setLikeLoading] = useState(false);
  const [isLiked, setLiked] = useState(false);

  const [isFavourite, setFavourite] = useState(false);
  const [isFavouriteLoading, setFavouriteLoading] = useState(false);

  const [isHover, setHover] = useState(false);
  const { data: session } = useSession();

  const { data: liked, isLoading: initialLikeLoading } = useQuery({
    queryKey: ["liked", shot.id, session?.user.id, predictedLikes],
    queryFn: () => fetchLiked(shot.id, session?.user.id || ""),
  });

  const { data: favourited, isLoading: initialFavouriteLoading } =
    useFavourited(shot.id, session?.user.id || "");

  useEffect(() => {
    dispatch(changeShotsLikes({ shotId: shot.id, likes: shot.likes }));
  }, [shot.id, shot.likes, dispatch]);

  useEffect(() => {
    setLiked(Boolean(liked));
  }, [liked, isLiked, predictedLikes]);

  useEffect(() => {
    setFavourite(Boolean(favourited));
  }, [favourited]);

  const isAnyLikeLoading = initialLikeLoading || isLikeLoading;
  const isAnyFavouriteLoading = initialFavouriteLoading || isFavouriteLoading;

  return (
    <Flex
      direction="column"
      className="max-w-96 h-80 gap-2 cursor-pointer"
      onMouseEnter={() => {
        if (window.innerWidth > 768) setHover(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth > 768) setHover(false);
      }}
    >
      <Box className="relative">
        <Image
          src={shot.imageUrl}
          alt=""
          width="400"
          height="300"
          className="h-80 object-cover rounded-2xl"
          priority={true}
          onClick={() => router.push(`/shots/${shot.id}`)}
        />
        <ShotControl
          isHover={isHover}
          shot={shot}
          userId={shot.userId}
          currentUserId={session?.user.id || ""}
        >
          <ShotButtons
            setLikeLoading={setLikeLoading}
            isLikeLoading={isAnyLikeLoading}
            isLiked={isLiked}
            shot={shot}
            setLiked={setLiked}
            isFavourite={isFavourite}
            setFavourite={setFavourite}
            isFavouriteLoading={isAnyFavouriteLoading}
            setFavouriteLoading={setFavouriteLoading}
          />
        </ShotControl>
      </Box>
      <Flex justify="between" align="center">
        {children}
        <ShotStats shotId={shot.id} views={shot.views} />
      </Flex>
    </Flex>
  );
}

const GradientOverlay = () => {
  return (
    <Box className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black rounded-b-2xl opacity-60" />
  );
};

const ShotButtons = ({
  shot,
  isLiked,
  setLiked,

  isLikeLoading,
  setLikeLoading,

  isFavourite,
  setFavourite,

  isFavouriteLoading,
  setFavouriteLoading,
}: {
  shot: Shot;
  isLiked: boolean;
  setLiked: React.Dispatch<SetStateAction<boolean>>;

  isFavourite: boolean;
  setFavourite: React.Dispatch<SetStateAction<boolean>>;

  isLikeLoading: boolean;
  setLikeLoading: React.Dispatch<SetStateAction<boolean>>;

  isFavouriteLoading: boolean;
  setFavouriteLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const handleLike = async () => {
    setLikeLoading(true);
    // update likes
    const { data: updatedShot }: AxiosResponse<Shot> = await axios.patch(
      "/api/shot/",
      {
        shotId: shot.id,
        option: "likes",
      }
    );

    setLikeLoading(false);
    setLiked((prevLiked) => !prevLiked);

    // update state
    dispatch(changeShotsLikes({ shotId: shot.id, likes: updatedShot.likes }));
  };

  const handleFavourite = async () => {
    setFavouriteLoading(true);
    const {
      data: { favourited },
    }: AxiosResponse<{ favourited: boolean }> = await axios.post(
      "/api/favourite/",
      {
        userId: session?.user?.id,
        shotId: shot.id,
      }
    );

    setFavourite(favourited);
    setFavouriteLoading(false);

    dispatch(
      setFavourited({
        userId: session?.user?.id,
        shotId: shot.id,
        isFavourite: favourited,
      })
    );
  };

  return (
    <Flex gap="2" align="start" className="pointer-events-auto">
      <IconButton onClick={handleLike}>
        <LikeContent isLiked={isLiked} isLoading={isLikeLoading} />
      </IconButton>
      <IconButton onClick={handleFavourite}>
        <FavouriteContent
          isFavourite={isFavourite}
          isLoading={isFavouriteLoading}
        />
      </IconButton>
    </Flex>
  );
};

const ShotControl = ({
  isHover,
  userId,
  currentUserId,
  shot,
  children,
}: {
  isHover: boolean;
  userId: string;
  currentUserId: string;
  shot: Shot;
  children: React.ReactNode;
}) => {
  const title = removeTags(shot.title);

  return (
    isHover && (
      <Box className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
        {/* darkening background */}
        <GradientOverlay />

        <Flex
          align="center"
          justify="between"
          className="absolute bottom-0 left-0 w-full p-4 rounded-2xl"
        >
          <Text className="text-white">{title}</Text>
          {userId !== currentUserId && currentUserId && children}
        </Flex>
      </Box>
    )
  );
};

const ShotStat = ({
  children: icon,
  count,
}: {
  children: ReactNode;
  count: number;
}) => {
  // format stat count
  const formattedText =
    count > 999 ? `${(count / 1000).toLocaleString()}k` : count; // 1000 -> 1k

  return (
    <Flex align="center" gap="1">
      {icon}
      <Text size="1">{formattedText}</Text>
    </Flex>
  );
};

const ShotStats = ({ shotId, views }: { shotId: string; views: number }) => {
  const likes = useShotInfo()[shotId] || 0;

  return (
    <Flex gap="3" className="text-gray-400">
      <ShotStat count={likes}>
        <FaHeart
          size="16"
          className="text-gray-400 opacity-50 hover:text-indigo-700 transition "
        />
      </ShotStat>
      <ShotStat count={views}>
        <FaEye size="16" className="text-gray-400 opacity-50" />
      </ShotStat>
    </Flex>
  );
};
