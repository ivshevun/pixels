import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { Avatar, Flex, Heading } from "@radix-ui/themes";
import SmallText from "../auth/components/SmallText";
import TransparentButton from "./components/TransparentButton";

interface Params {
  params: { username: string };
}

export default async function Dashboard({ params }: Params) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  if (!user) return; // todo: change this logic

  return (
    <Flex
      direction="column"
      width="100%"
      pt="7"
      className="h-screen"
      align="center"
    >
      <UserInfo user={user} />
    </Flex>
  );
}

const UserInfo = ({ user }: { user: User }) => {
  return (
    <Flex gap="5" align="center" direction={{ initial: "column", sm: "row" }}>
      <Avatar size="7" radius="full" src={user.image!} fallback="?" />
      <Flex
        direction="column"
        gap="1"
        align={{ initial: "center", sm: "start" }}
      >
        <Heading className="font-semibold">
          {user.username || user.name}
        </Heading>
        <SmallText className="text-sm text-gray-400">{user.email}</SmallText>
        <TransparentButton>Edit profile</TransparentButton>
      </Flex>
    </Flex>
  );
};
