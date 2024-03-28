"use client";
import DarkButton from "@/app/components/DarkButton";
import FavouriteContent from "@/app/components/ShotCard/FavouriteContent";
import LikeContent from "@/app/components/ShotCard/LikeContent";
import TransparentButton from "@/app/components/TransparentButton";
import useFavourited from "@/app/hooks/useFavourited";
import useLiked from "@/app/hooks/useLiked";
import { setFavourited } from "@/lib/redux/features/favourites/favouritesSlice";
import { changeShotsLikes } from "@/lib/redux/features/shotsLikes/shotsLikesSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Shot } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
  const [isFavourite, setFavourite] = useState(false);
  const [isLikeLoading, setLikeLoading] = useState(false);
  const [isFavouriteLoading, setFavouriteLoading] = useState(false);

  const { data: liked, isLoading: initialLikeLoading } = useLiked(
    shot.id,
    session?.user.id || ""
  );

  const { data: favourited, isLoading: initialFavouriteLoading } =
    useFavourited(shot.id, session?.user.id || "");

  useEffect(() => {
    if (liked) {
      setLiked(true);
    }
  }, [liked]);

  useEffect(() => {
    dispatch(changeShotsLikes({ shotId: shot.id, likes: shot.likes }));
  }, [shot.id, shot.likes, dispatch]);

  useEffect(() => {
    setFavourite(Boolean(favourited));
  }, [favourited]);

  const isAnyLikeLoading = initialLikeLoading || isLikeLoading;
  const isAnyFavouriteLoading = initialFavouriteLoading || isFavouriteLoading;

  const isButtonDisabled =
    authorName === session?.user.username || authorName === session?.user.name;

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

    updatedShot && setLiked((prevLiked) => !prevLiked);
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
    <Flex gap="3" className="items-center">
      <TransparentButton
        className="p-2 sm:p-3"
        onClick={handleLike}
        disabled={isButtonDisabled}
      >
        <LikeContent isLiked={isLiked} isLoading={isAnyLikeLoading} />
      </TransparentButton>
      <TransparentButton
        className="p-2 sm:p-3"
        disabled={isButtonDisabled}
        onClick={handleFavourite}
      >
        <FavouriteContent
          isFavourite={isFavourite}
          isLoading={isAnyFavouriteLoading}
        />
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
