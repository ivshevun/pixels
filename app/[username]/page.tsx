import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import ShotCard from "../components/ShotCard/ShotCard";
import ShotUserInfo from "../components/ShotCard/UserInfo";
import FirstShot from "./components/FirstShot";
import ShotsGrid from "./components/ShotsGrid";

export interface UsernameParams {
  params: { username: string };
}

export default async function Dashboard({ params }: UsernameParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  // TODO: make it return 404 page
  if (!user) return null;

  return <UserShots user={user} />;
}

const UserShots = async ({ user }: { user: User }) => {
  const shots = await prisma.shot.findMany({
    where: {
      user,
    },
  });

  return (
    <div className="px-4 md:px-0">
      {shots.length === 0 && <FirstShot />}
      <ShotsGrid>
        {shots.map((shot) => (
          <ShotCard
            key={shot.id}
            shot={shot}
            userName={user.username || user.name || ""}
          >
            <ShotUserInfo userId={user.id} />
          </ShotCard>
        ))}
      </ShotsGrid>
    </div>
  );
};
