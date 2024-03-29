import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import ShotCard from "../components/ShotCard/ShotCard";
import ShotUserInfo from "../components/ShotCard/UserInfo";
import FirstShot from "./components/FirstShot";
import ShotsGrid from "./components/ShotsGrid";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";
import NoShots from "./NoShots";
import noResults from "@/public/assets/no-shots.jpg";

export interface UsernameParams {
  params: { username: string };
}

export default async function Dashboard({ params }: UsernameParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  // TODO: make it return 404 page
  if (!user) return null;

  return (
    <div className="px-4 md:px-0">
      <UserShots user={user} />
    </div>
  );
}

const UserShots = async ({ user }: { user: User }) => {
  const session = await getServerSession(authOptions);

  const shots = await prisma.shot.findMany({
    where: {
      user,
    },
  });

  if (shots.length === 0 && user.id === session?.user.id) return <FirstShot />;

  if (shots.length === 0 && user.id !== session?.user.id)
    return (
      <NoShots
        imageSource={noResults}
        heading="No shots :("
        message={`It looks like ${
          user.username || user.name
        } hasn’t uploaded any shots yet. Check back soon!`}
        isSmall={true}
      />
    );

  return (
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
  );
};
