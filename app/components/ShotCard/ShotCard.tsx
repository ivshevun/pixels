"use client";
import removeTags from "@/app/[username]/utils/removeTags";
import { Tag } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import IconButton from "./IconButton";
import prisma from "@/prisma/client";
import axios from "axios";

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
  const [isHover, setHover] = useState(false);
  const { data: session } = useSession();

  return (
    <Flex
      direction="column"
      className="max-w-96 max-h-80 gap-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box className="relative">
        <Image
          src={shot.imageUrl}
          alt=""
          width="400"
          height="300"
          className="max-h-80 object-cover rounded-2xl"
          priority={false}
        />
        <ShotControl
          isHover={isHover}
          shot={shot}
          userName={userName}
          currentUser={session?.user.username || session?.user.name || ""}
        />
      </Box>
      <Flex justify="between" align="center">
        {children}
        <ShotStats likes={shot.likes} views={shot.views} />
      </Flex>
    </Flex>
  );
}

const GradientOverlay = () => {
  return (
    <Box className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black rounded-b-2xl opacity-60" />
  );
};

const ShotButtons = ({ shot }: { shot: Shot }) => {
  // its a bad approach
  const handleClick = async (option: string) => {
    // update likes
    await axios.patch("/api/shot/", { shotId: shot.id, option });

    // update state
    console.log("likes updated!"); // but it does not rerender a component
  };

  return (
    <Flex gap="2" align="start" className="pointer-events-auto">
      {/* hover and pointer button styles does not work */}
      <IconButton onClick={() => handleClick("likes")}>
        <FaRegHeart size="16" className="hover:opacity-60" />
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
}: {
  isHover: boolean;
  userName: string;
  currentUser: string;
  shot: Shot;
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
          {userName !== currentUser && <ShotButtons shot={shot} />}
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

const ShotStats = ({ likes, views }: { likes: number; views: number }) => {
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
