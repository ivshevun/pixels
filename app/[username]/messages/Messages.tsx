"use client";
import useMyMessages from "@/app/hooks/useMyMessages";
import useUser from "@/app/hooks/useUser";
import formatDate from "@/app/utils/formatDate";
import { Message } from "@prisma/client";
import { Card, Flex, Skeleton, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import DeleteButton, { RefetchType } from "./DeleteButton";
import MessageSkeleton from "./MessageSkeleton";
import MessageDetail from "./MessageDetail";

export default function Messages() {
  const { data: session } = useSession();
  const { data, isLoading, refetch } = useMyMessages(session?.user?.id || "");

  if (isLoading)
    return (
      <Flex direction="column" className="px-2" gap="4">
        {[1, 2, 3, 4].map((index) => (
          <MessageSkeleton key={index} />
        ))}
      </Flex>
    );

  return (
    <Flex direction="column" gap="4" className="px-2">
      {data?.pages.map((page) =>
        page.messages.map((message) => (
          <MessageCard key={message.id} message={message} refetch={refetch} />
        ))
      )}
    </Flex>
  );
}

const MessageCard = ({
  message,
  refetch,
}: {
  message: Message;
  refetch: RefetchType;
}) => {
  const { data: sender, isLoading } = useUser(message.senderId);
  const today = new Date();
  const createdAt = new Date(message?.createdAt);
  const isToday =
    createdAt.getDate() === today.getDate() &&
    createdAt.getMonth() === today.getMonth() &&
    createdAt.getFullYear() === today.getFullYear();

  const minutes = createdAt.getMinutes();

  const hourPublicated = `${createdAt.getHours()}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  return (
    <MessageDetail message={message} sender={sender?.data} refetch={refetch}>
      <Card className="hover:py-4 transition-all cursor-pointer  ">
        <Flex justify="between" gap="9">
          {isLoading ? (
            <Skeleton className="w-10 h-6" />
          ) : (
            <Text className="font-bold ">
              {sender?.data.name || sender?.data.username}
            </Text>
          )}
          <Text className="whitespace-nowrap overflow-hidden text-ellipsis flex-1">
            {message.message}
          </Text>
          <Flex align="center" gap="4">
            <Text>{isToday ? hourPublicated : formatDate(createdAt)}</Text>
            <DeleteButton refetch={refetch} messageId={message.id} />
          </Flex>
        </Flex>
      </Card>
    </MessageDetail>
  );
};
