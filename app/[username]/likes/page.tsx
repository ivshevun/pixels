import ShotCard from "@/app/components/ShotCard/ShotCard";
import prisma from "@/prisma/client";
import ShotUserInfo from "../../components/ShotCard/UserInfo";
import ShotsGrid from "../components/ShotsGrid";
import { UsernameParams } from "../page";

export default async function LikesPage({ params }: UsernameParams) {
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

  if (likes.length === 0) return null;

  const shotIds = likes.map((like) => like.shotId);
  const shots = await prisma.shot.findMany({
    where: {
      id: {
        in: shotIds,
      },
    },
  });

  if (shots.length === 0) return null;

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
