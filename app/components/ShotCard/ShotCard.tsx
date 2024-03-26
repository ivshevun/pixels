"use client";
import { fetchLiked } from "@/app/hooks/useLiked";
import removeTags from "@/app/utils/removeTags";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { changePredictedLikes } from "@/lib/redux/features/shotInfo/shotInfoSlice";
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
import { IoBookmarkOutline } from "react-icons/io5";
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
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [isHover, setHover] = useState(false);
  const { data: session } = useSession();
  const { predictedLikes } = useShotInfo();

  useEffect(() => {
    dispatch(changePredictedLikes(shot.likes));
  }, [dispatch, shot.likes]);

  const { data, isLoading: initialLoading } = useQuery({
    queryKey: ["liked", shot.id, session?.user.id, predictedLikes],
    queryFn: () => fetchLiked(shot.id, session?.user.id || ""),
  });

  useEffect(() => {
    if (data) {
      setLiked(data);
      console.log(data);
    }
  }, [data]);

  const isAnyLoading = initialLoading || isLoading;

  return (
    <Flex
      direction="column"
      className="max-w-96 max-h-80 gap-2 cursor-pointer"
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
          className="max-h-80 object-cover rounded-2xl"
          priority={false}
          onClick={() => router.push(`/shots/${shot.id}`)}
        />
        <ShotControl
          isHover={isHover}
          shot={shot}
          userName={userName}
          currentUser={session?.user.username || session?.user.name || ""}
        >
          <ShotButtons
            setLoading={setLoading}
            isLoading={isAnyLoading}
            isLiked={isLiked}
            shot={shot}
            setLiked={setLiked}
          />
        </ShotControl>
      </Box>
      <Flex justify="between" align="center">
        {children}
        <ShotStats views={shot.views} />
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
  isLoading,
  setLoading,
  setLiked,
}: {
  shot: Shot;
  isLiked: boolean;
  isLoading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  setLiked: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const handleClick = async (option: string) => {
    setLoading(true);
    // update likes
    const { data: updatedShot }: AxiosResponse<Shot> = await axios.patch(
      "/api/shot/",
      {
        shotId: shot.id,
        option,
      }
    );

    setLoading(false);
    setLiked((prevLiked) => !prevLiked);

    // update state
    dispatch(changePredictedLikes(updatedShot.likes));
  };

  return (
    <Flex gap="2" align="start" className="pointer-events-auto">
      <IconButton onClick={() => handleClick("likes")}>
        <LikeContent isLiked={isLiked} isLoading={isLoading} />
      </IconButton>
      <IconButton>
        <IoBookmarkOutline size="18" className="hover:opacity-60" />
      </IconButton>
    </Flex>
  );
};

const ShotControl = ({
  isHover,
  userName,
  currentUser,
  shot,
  children,
}: {
  isHover: boolean;
  userName: string;
  currentUser: string;
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
          {userName !== currentUser && children}
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

const ShotStats = ({ views }: { views: number }) => {
  const { predictedLikes: likes } = useShotInfo();

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
