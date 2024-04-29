import authOptions from "@/app/auth/authOptions";
import log from "@/lib/log";
import prisma from "@/prisma/client";
import { Avatar, Flex, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ButtonsLoading from "./ButtonsLoading";
import ShotEditing from "./ShotEditing";
import ShotFooter from "./ShotFooter/ShotFooter";
import ShotInfoButtons from "./ShotInfoButtons";
import "./styles.css";

const ShotButtons = dynamic(() => import("@/app/shots/[shotId]/ShotButtons"), {
  ssr: false,
  loading: ButtonsLoading,
});

const ShotCommentsDrawer = dynamic(
  () => import("@/app/shots/[shotId]/ShotCommentsDrawer"),
  {
    ssr: false,
  }
);

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
  if (!shot) return redirect("/not-found");

  const user = await prisma.user.findUnique({
    where: {
      id: shot.userId,
    },
  });

  const isAuthor = session?.user.id === user?.id;

  if (!isAuthor) {
    // update views count if not author and user is logged in
    try {
      const existingView = await prisma.view.findFirst({
        where: {
          shotId,
          userId: session?.user.id || "",
        },
      });
      if (!existingView && session?.user.id) {
        await prisma.$transaction([
          prisma.view.create({
            data: {
              shotId: shotId,
              userId: session?.user.id,
            },
          }),
          prisma.shot.update({
            where: {
              id: shotId,
            },
            data: {
              views: {
                increment: 1,
              },
            },
          }),
        ]);
      }
    } catch (error) {
      // TODO: handle error
      log(error);
    }
  }

  return (
    <Flex className="py-8 sm:py-14 md:py-16 flex-col justify-center w-full px-4 sm:px-0 sm:w-3/4 md:w-1/2 mx-auto gap-8">
      <Heading>{shot.title}</Heading>
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
        <ShotButtons authorId={user?.id || ""} shot={shot} />
      </Flex>
      <Image
        className="rounded-xl"
        src={shot.imageUrl}
        alt="Shot image"
        width="3200"
        height="2400"
        priority={true}
      />
      <div
        id="description"
        dangerouslySetInnerHTML={{ __html: shot.description }}
      />
      <ShotInfoButtons shot={shot} />
      <ShotCommentsDrawer shotId={shot.id} />
      {session?.user.id === shot.userId && <ShotEditing shotId={shot.id} />}
      <ShotFooter isAuthor={isAuthor} currentShot={shot} userId={shot.userId} />
    </Flex>
  );
}

export async function generateMetadata({ params: { shotId } }: Params) {
  const shot = await prisma.shot.findUnique({
    where: {
      id: shotId,
    },
  });

  return {
    title: `${shot?.title} | Pixels`,
    description: "Pixels - Shot Page",
  };
}
