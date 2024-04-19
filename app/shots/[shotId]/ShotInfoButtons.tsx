"use client";
import TransparentButton from "@/app/components/Buttons/TransparentButton";
import { Shot } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import ShotInfoDialog from "./ShotInfoDialog";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCommentsOpen } from "@/lib/redux/features/disclosure/disclosureSlice";

export default function ShotInfoButtons({ shot }: { shot: Shot }) {
  const dispatch = useAppDispatch();

  return (
    <Flex
      className="justify-center sm:flex-col sm:absolute sm:top-1/3 sm:right-5"
      gap="2"
    >
      <TransparentButton
        className="flex justify-center text-center p-2 border rounded-full"
        onClick={() => dispatch(setCommentsOpen(true))}
      >
        <FaRegComment size="18" />
      </TransparentButton>
      <ShotInfoDialog shot={shot} />
    </Flex>
  );
}
