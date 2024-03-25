"use client";
import TransparentButton from "@/app/[username]/components/TransparentButton";
import DarkButton from "@/app/components/DarkButton";
import log from "@/lib/log";
import { Shot } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariants } from "@/lib/animationVariants";

export default function ShotButtons({ shot }: { shot: Shot }) {
  const { data: session } = useSession();
  const [isLiked, setLiked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data }: AxiosResponse<{ liked: boolean }> = await axios.get(
          "/api/like",
          {
            params: { shotId: shot.id, userId: session?.user.id },
          }
        );

        setLiked(data.liked);
      } catch (error) {
        log(error);
      }
    };

    fetchLikes();
  }, [shot.id, session?.user.id]);

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
        <AnimatePresence>
          {isLiked && !isLoading ? (
            <motion.div
              variants={opacityVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <FaHeart className="text-purple-500" />
              </motion.div>
            </motion.div>
          ) : (
            !isLoading && <FaRegHeart />
          )}
          {isLoading && (
            <motion.div
              variants={opacityVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ImSpinner8 className="text-purple-500 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
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
