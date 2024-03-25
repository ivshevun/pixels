"use client";
import TransparentButton from "@/app/[username]/components/TransparentButton";
import DarkButton from "@/app/components/DarkButton";
import LikeContent from "@/app/components/ShotCard/LikeContent";
import useLiked from "@/app/hooks/useLiked";
import { Shot } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function ShotButtons({ shot }: { shot: Shot }) {
  const { data: session } = useSession();
  const [isLiked, setLiked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { data, isLoading: initialLoading } = useLiked(
    shot.id,
    session?.user.id || ""
  );

  useEffect(() => {
    if (data) {
      setLiked(true);
    }
  }, [data]);

  const isAnyLoading = initialLoading || isLoading;

  const handleClick = async (option: string) => {
    setLoading(true);
    // update likes
    await axios.patch("/api/shot/", {
      shotId: shot.id,
      option,
    });

    setLoading(false);

    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <Flex gap="3" className="items-center">
      <TransparentButton
        className="p-2 sm:p-3"
        onClick={() => handleClick("likes")}
      >
        <LikeContent isLiked={isLiked} isLoading={isAnyLoading} />
      </TransparentButton>
      <TransparentButton className="p-2 sm:p-3">
        <FaRegBookmark />
      </TransparentButton>
      <DarkButton className="text-xs sm:text-sm px-4 py-2">
        {window.innerWidth > 768 ? (
          "Get In Touch"
        ) : (
          <MdOutlineEmail size="16" />
        )}
      </DarkButton>
    </Flex>
  );
}
