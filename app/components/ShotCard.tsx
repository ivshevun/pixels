"use client";
import { Avatar, Box, Flex, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import NextLink from "next/link";
import { PropsWithChildren, ReactNode, useState } from "react";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";

export default function ShotCard() {
  const [isHover, setHover] = useState(false);

  return (
    <Flex
      direction="column"
      className="max-w-96 max-h-80 gap-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box className="relative">
        <Image
          src="https://cdn.dribbble.com/userupload/12197547/file/original-8a85c5dfa65835b00643b2419499e20a.jpg?resize=1024x772"
          alt=""
          width="400"
          height="300"
          className="max-h-80 object-cover rounded-2xl"
          priority={false}
        />
        <ShotControl isHover={isHover} />
      </Box>
      <Flex justify="between" align="center">
        <UserInfo />
        <ShotStats />
      </Flex>
    </Flex>
  );
}

const GradientOverlay = () => {
  return (
    <Box className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black rounded-b-2xl opacity-60" />
  );
};

const IconButton = ({ children }: PropsWithChildren) => {
  return (
    <button className="bg-white text-black p-3 rounded-full cursor-pointer">
      {children}
    </button>
  );
};

const ShotButtons = () => {
  return (
    <Flex gap="2" align="start" className="pointer-events-auto">
      {/* hover and pointer button styles does not work */}
      <IconButton>
        <FaRegHeart size="16" className="hover:opacity-60" />
      </IconButton>
      <IconButton>
        <IoBookmarkOutline size="18" className="hover:opacity-60" />
      </IconButton>
    </Flex>
  );
};

const ShotControl = ({ isHover }: { isHover: boolean }) => {
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
          <Text className="text-white">Sold Out Branded Illustration</Text>
          <ShotButtons />
        </Flex>
      </Box>
    )
  );
};

const UserInfo = () => {
  return (
    <Flex align="center" gap="3">
      <Avatar
        src="https://cdn.dribbble.com/users/3365798/avatars/small/27142d0984a19231593be35a9972bbc4.jpg?1673891024"
        fallback="?"
        radius="full"
        size="1"
      />
      <NextLink href="#" passHref legacyBehavior>
        <Link size="2" className="text-indigo-950 no-underline">
          Coric Design
        </Link>
      </NextLink>
    </Flex>
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

const ShotStats = () => {
  return (
    <Flex gap="3" className="text-gray-400">
      <ShotStat count={63}>
        <FaHeart
          size="16"
          className="text-gray-400 opacity-50 hover:text-indigo-700 transition "
        />
      </ShotStat>
      <ShotStat count={9700}>
        <FaEye size="16" className="text-gray-400 opacity-50" />
      </ShotStat>
    </Flex>
  );
};
