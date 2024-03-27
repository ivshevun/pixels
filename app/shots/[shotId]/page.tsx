import authOptions from "@/app/auth/authOptions";
import removeTags from "@/app/utils/removeTags";
import log from "@/lib/log";
import prisma from "@/prisma/client";
import { Avatar, Flex, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";

const ShotButtons = dynamic(() => import("@/app/shots/[shotId]/ShotButtons"), {
  ssr: false,
});

interface Params {
  params: { shotId: string };
}

export default async function ShotPage({ params: { shotId } }: Params) {
  const session = await getServerSession(authOptions);
  const shot = await prisma.shot.findUnique({
    where: {
      id: shotId,
    },
  });

  // TODO: return 404 page
  if (!shot) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: shot.userId,
    },
  });

  const isAuthor = session?.user.id === user?.id;

  if (!isAuthor) {
    // make an api request to shot.patch() and patch views
    try {
      await fetch(`${process.env.NEXTAUTH_URL}/api/shot/`, {
        method: "PATCH",
        body: JSON.stringify({
          shotId,
          option: "views",
        }),
        headers: headers(),
      }).then((res) => res.json());
    } catch (error) {
      // TODO: handle error
      log(error);
    }
  }

  return (
    <Flex className="py-8 sm:py-14 md:py-16 flex-col justify-center w-full px-4 sm:px-0 sm:w-3/4 md:w-1/2 mx-auto gap-8">
      <Heading>{removeTags(shot.title)}</Heading>
      <Flex justify="between" gap="3">
        <Flex gap="2" align="center">
          <Link href={`/${user?.username}`}>
            <Avatar
              src={user?.image || ""}
              fallback="?"
              className="rounded-full"
              size={{ initial: "1", sm: "2", md: "3" }}
            />
          </Link>
          <Flex direction="column">
            <Link
              href={`/${user?.username}`}
              className="text-xs sm:text-sm md:text-base"
            >
              {user?.username || user?.name}
            </Link>
            <Flex className="items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full relative">
                <span className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              </span>
              <Text className="text-xs text-nowrap text-green-600">
                Available for work
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <ShotButtons
          authorName={user?.username || user?.name || ""}
          shot={shot}
        />
      </Flex>
      <Image
        className="rounded-xl"
        src={shot.imageUrl}
        alt="Shot image"
        width="3200"
        height="2400"
        priority
      />
      <div
        id="description"
        dangerouslySetInnerHTML={{ __html: shot.description }}
      />
    </Flex>
  );
}
