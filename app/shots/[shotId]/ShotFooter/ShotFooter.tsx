import DarkButton from "@/app/components/Buttons/DarkButton";
import ShotCard from "@/app/components/ShotCard/ShotCard";
import ShotUserInfo from "@/app/components/ShotCard/UserInfo";
import prisma from "@/prisma/client";
import { Shot, User } from "@prisma/client";
import { Avatar, Flex, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import SendMessage from "./SendMessage";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export default async function ShotFooter({
  userId,
  currentShot,
  isAuthor,
}: {
  userId: string;
  currentShot: Shot;
  isAuthor: boolean;
}) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  return (
    <Flex className="w-full" direction="column" gap="6">
      <UserInfo isAuthor={isAuthor} user={user} />
      <UserShots user={user} currentShot={currentShot} />
    </Flex>
  );
}

const UserInfo = async ({
  user,
  isAuthor,
}: {
  user: User;
  isAuthor: boolean;
}) => {
  const session = await getServerSession(authOptions);

  return (
    <Flex direction="column" align="center" gap="2">
      <Flex className="w-full" align="center" gap="4">
        <Separator className="w-full" />
        <Avatar
          src={user?.image || ""}
          alt="User avatar"
          fallback="?"
          radius="full"
          size="5"
        />
        <Separator className="w-full" />
      </Flex>

      <Text className="font-medium text-xl">
        {user?.name || user?.username || "Anonymous"}
      </Text>
      <SendMessage user={user}>
        <DarkButton
          disabled={isAuthor || !session}
          className="flex items-center gap-2 px-6 py-2 text-sm"
        >
          <IoMailOutline size="20" />
          Get in touch
        </DarkButton>
      </SendMessage>
    </Flex>
  );
};

const UserShots = async ({
  user,
  currentShot,
}: {
  user: User;
  currentShot: Shot;
}) => {
  const shots = await prisma.shot.findMany({
    where: { userId: user.id, id: { not: currentShot.id } },
    orderBy: { views: "desc" },
    take: 2,
  });

  if (shots.length === 0) return null;

  return (
    <Flex direction="column" gap="6">
      <Flex
        align="center"
        justify="between"
        direction={{ initial: "column", sm: "row" }}
        className="px-0 xs:px-2 gap-y-5"
      >
        <Text className="font-bold">More by {user.name || user.username}</Text>
        <Link href={`/${user.username}`} className="font-normal text-sm">
          View profile
        </Link>
      </Flex>
      <Flex
        direction={{ initial: "column", md: "row" }}
        gap="8"
        align="center"
        justify={shots.length === 1 ? "center" : "between"}
      >
        {shots.map((shot) => (
          <ShotCard key={shot.id} shot={shot}>
            <ShotUserInfo userId={user.id} />
          </ShotCard>
        ))}
      </Flex>
    </Flex>
  );
};
