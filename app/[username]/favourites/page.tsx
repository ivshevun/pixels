import ShotCard from "@/app/components/ShotCard/ShotCard";
import prisma from "@/prisma/client";
import ShotUserInfo from "../../components/ShotCard/UserInfo";
import ShotsGrid from "../components/ShotsGrid";
import { UsernameParams } from "../page";
import NoShots from "../NoShots";
import noFavourites from "@/public/assets/no-favourites.jpg";

export default async function FavouritesPage({ params }: UsernameParams) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!user) return null;

  const favourites = await prisma.favourite.findMany({
    where: {
      userId: user.id,
    },
  });

  if (favourites.length === 0)
    return (
      <NoShots
        imageSource={noFavourites}
        heading="Save your inspiration"
        message="Save interesting shots and discover new and interesting recommendations along the way."
      />
    );

  const shotIds = favourites.map((favourite) => favourite.shotId);
  const shots = await prisma.shot.findMany({
    where: {
      id: {
        in: shotIds,
      },
    },
  });

  if (shots.length === 0)
    return (
      <NoShots
        imageSource={noFavourites}
        heading="Save your inspiration"
        message="Save interesting shots and discover new and interesting recommendations along the way."
      />
    );

  return (
    <ShotsGrid>
      {await Promise.all(
        shots.map(async (shot) => {
          const author = await prisma.user.findUnique({
            where: {
              id: shot.userId,
            },
          });

          if (!author) return null;

          return (
            <ShotCard
              key={shot.id}
              shot={shot}
              userName={author?.username || author?.name || ""}
            >
              <ShotUserInfo userId={shot.userId} />
            </ShotCard>
          );
        })
      )}
    </ShotsGrid>
  );
}
