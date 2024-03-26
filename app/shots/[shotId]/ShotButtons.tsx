"use client";
import DarkButton from "@/app/components/DarkButton";
import LikeContent from "@/app/components/ShotCard/LikeContent";
import TransparentButton from "@/app/components/TransparentButton";
import useLiked from "@/app/hooks/useLiked";
import { changePredictedLikes } from "@/lib/redux/features/shotInfo/shotInfoSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Shot } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function ShotButtons({
  shot,
  authorName,
}: {
  shot: Shot;
  authorName: string;
}) {
  const dispatch = useAppDispatch();
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

  const isButtonDisabled =
    authorName === session?.user.username || authorName === session?.user.name;

  const handleClick = async (option: string) => {
    setLoading(true);
    // update likes
    const { data: updatedShot } = await axios.patch("/api/shot/", {
      shotId: shot.id,
      option,
    });

    setLoading(false);

    setLiked((prevLiked) => !prevLiked);

    dispatch(changePredictedLikes(updatedShot.likes));
  };

  return (
    <Flex gap="3" className="items-center">
      <TransparentButton
        className="p-2 sm:p-3"
        onClick={() => handleClick("likes")}
        disabled={isButtonDisabled}
      >
        <LikeContent isLiked={isLiked} isLoading={isAnyLoading} />
      </TransparentButton>
      <TransparentButton className="p-2 sm:p-3" disabled={isButtonDisabled}>
        <FaRegBookmark />
      </TransparentButton>
      <DarkButton
        className="text-xs sm:text-sm px-4 py-2"
        disabled={isButtonDisabled}
      >
        {window.innerWidth > 768 ? (
          "Get In Touch"
        ) : (
          <MdOutlineEmail size="16" />
        )}
      </DarkButton>
    </Flex>
  );
}
