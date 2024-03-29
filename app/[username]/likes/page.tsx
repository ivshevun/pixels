import ShotCard from "@/app/components/ShotCard/ShotCard";
import prisma from "@/prisma/client";
import ShotUserInfo from "../../components/ShotCard/UserInfo";
import ShotsGrid from "../components/ShotsGrid";
import { UsernameParams } from "../page";
import NoShots from "../NoShots";
import noLikes from "@/public/assets/no-likes.png";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export default async function LikesPage({ params }: UsernameParams) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!user) return null;

  const likes = await prisma.like.findMany({
    where: {
      userId: user.id,
    },
  });

  const isAuthor = session?.user.id === user.id;

  const heading = isAuthor ? "Express your appreciation" : "No Likes :(";
  const message = isAuthor
    ? "Show your appreciation for other's work by liking the shots you love. We'll collect all of your likes here for you to revisit anytime. "
    : `It looks like ${
        user.username || user.name
      } hasn’t liked any Shots yet. Check back soon!`;

  if (likes.length === 0)
    return (
      <NoShots imageSource={noLikes} heading={heading} message={message} />
    );

  const shotIds = likes.map((like) => like.shotId);
  const shots = await prisma.shot.findMany({
    where: {
      id: {
        in: shotIds,
      },
    },
  });

  if (shots.length === 0)
    return (
      <NoShots imageSource={noLikes} heading={heading} message={message} />
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
