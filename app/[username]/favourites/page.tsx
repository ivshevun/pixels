import ShotCard from "@/app/components/ShotCard/ShotCard";
import prisma from "@/prisma/client";
import ShotUserInfo from "../../components/ShotCard/UserInfo";
import ShotsGrid from "../components/ShotsGrid";
import { UsernameParams } from "../page";
import NoShots from "../NoShots";
import noFavourites from "@/public/assets/no-favourites.jpg";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export default async function FavouritesPage({ params }: UsernameParams) {
  const session = await getServerSession(authOptions);
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

  const isAuthor = session?.user.id === user.id;

  const heading = isAuthor ? "Save your inspiration" : "No favourites";
  const message = isAuthor
    ? "Save interesting shots and discover new and interesting recommendations along the way."
    : `It looks like ${
        user.username || user.name
      } hasn’t uploaded any favourites yet. Check back soon!`;

  if (favourites.length === 0)
    return (
      <NoShots imageSource={noFavourites} heading={heading} message={message} />
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
      <NoShots imageSource={noFavourites} heading={heading} message={message} />
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
