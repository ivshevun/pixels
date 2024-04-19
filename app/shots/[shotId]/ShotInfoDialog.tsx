"use client";
import TransparentButton from "@/app/components/Buttons/TransparentButton";
import { Shot } from "@prisma/client";
import { Dialog, Flex, Text } from "@radix-ui/themes";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const formatDate = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${months[month]} ${day}, ${year}`;
};

export default function ShotInfoDialog({ shot }: { shot: Shot }) {
  const stats = {
    views: shot.views,
    saves: shot.saves,
    likes: shot.likes,
    comments: shot.comments,
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <TransparentButton className="p-2 border rounded-full">
          <IoIosInformationCircleOutline size="24" />
        </TransparentButton>
      </Dialog.Trigger>
      <Dialog.Content className="px-12 py-12 max-w-[488px] ">
        <Dialog.Title className="flex items-center ">
          Shot details
          <Dialog.Close className="ml-auto cursor-pointer">
            <RxCross2 />
          </Dialog.Close>
        </Dialog.Title>
        <Dialog.Description>
          <Text className="text-sm">Posted {formatDate(shot.createdAt)}</Text>
        </Dialog.Description>
        <Flex justify="between" className="hidden sm:flex mt-4">
          {Object.entries(stats).map(([stat, count]) => (
            <Stat key={stat} stat={stat} count={count} />
          ))}
        </Flex>
        <Flex gap="4" direction="column" className="sm:hidden mt-4">
          <Flex gap="4">
            <Stat stat="Views" count={shot.views} />
            <Stat stat="Saves" count={shot.saves} />
          </Flex>
          <Flex gap="4">
            <Stat stat="Likes" count={shot.likes} />
            <Stat stat="Comments" count={shot.comments} />
          </Flex>
        </Flex>
        <Flex direction="column" className="mt-8" gap="2">
          <Text className="text-sm">Tags</Text>
          <Flex>
            {shot.tags.map((tag) => {
              return <Tag key={tag} tag={tag} />;
            })}
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const Stat = ({ stat, count }: { stat: string; count: number }) => {
  return (
    <Flex direction="column" gap="2">
      <Text className="capitalize ">{stat}</Text>
      <Text>{count}</Text>
    </Flex>
  );
};

const Tag = ({ tag }: { tag: string }) => {
  return (
    <Text className="px-3 py-2 border rounded-lg text-sm text-center">
      {tag}
    </Text>
  );
};
