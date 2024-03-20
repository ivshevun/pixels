import prisma from "@/prisma/client";
import { Shot, User } from "@prisma/client";
import { Avatar, Box, Flex, Grid, Heading } from "@radix-ui/themes";
import SmallText from "../auth/components/SmallText";
import UserTabs from "./UserTabs";
import TransparentButton from "./components/TransparentButton";
import FirstShot from "./components/FirstShot";
import { log } from "console";
import ShotCard from "../components/ShotCard/ShotCard";
import ShotUserInfo from "../components/ShotCard/UserInfo";

interface Params {
  params: { username: string };
}

export default async function Dashboard({ params }: Params) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  // TODO: make it return 404 page
  if (!user) return;

  return (
    <Flex
      direction="column"
      width="100%"
      py="7"
      className="h-100% py-16 md:px-8 xl:px-20"
      gap="7"
    >
      <UserInfo user={user} />
      <UserTabs user={user} />
      <UserShots user={user} />
    </Flex>
  );
}

const UserInfo = ({ user }: { user: User }) => {
  return (
    <Flex
      gap="6"
      align="center"
      justify="center"
      direction={{ initial: "column", sm: "row" }}
    >
      <Avatar
        size={{ initial: "7", md: "8" }}
        radius="full"
        src={user.image!}
        fallback="?"
      />
      <Flex
        direction="column"
        gap="1"
        align={{ initial: "center", sm: "start" }}
      >
        <Heading className="font-semibold text-2xl md:text-4xl">
          {user.username || user.name}
        </Heading>
        <SmallText className="text-sm text-gray-400">{user.email}</SmallText>
        <TransparentButton className="w-3/5 py-3 px-4">
          Edit profile
        </TransparentButton>
      </Flex>
    </Flex>
  );
};

const UserShots = async ({ user }: { user: User }) => {
  const shots = await prisma.shot.findMany({
    where: {
      user,
    },
  });
  log(shots);

  return (
    <div className="px-4 md:px-0">
      {shots.length === 0 && <FirstShot />}
      <Flex justify={{ initial: "center", lg: "start" }}>
        <Grid
          columns={{ initial: "1", md: "2", lg: "3", xl: "4" }}
          gap="9"
          className=""
        >
          {shots.map((shot) => (
            <ShotCard
              key={shot.id}
              shotData={shot}
              userName={user.username || user.name || ""}
            >
              <ShotUserInfo userId={user.id} />
            </ShotCard>
          ))}
        </Grid>
      </Flex>
    </div>
  );
};
