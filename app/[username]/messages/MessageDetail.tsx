import formatDate from "@/app/utils/formatDate";
import { Message, User } from "@prisma/client";
import { Dialog, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RefetchType, handleDelete } from "./DeleteButton";

const truncatedStyles = "whitespace-nowrap overflow-hidden text-ellipsis";

export default function MessageDetail({
  children,
  message,
  sender,
  refetch,
}: {
  children: React.ReactNode;
  message: Message;
  sender?: User;
  refetch: RefetchType;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="flex flex-col gap-4 sm:gap-0">
        <Dialog.Title className="flex items-center">
          <Text className={truncatedStyles}>{message.title}</Text>
          <Dialog.Close className="ml-auto cursor-pointer">
            <RxCross2 />
          </Dialog.Close>
        </Dialog.Title>
        <Text>{message.message}</Text>
        <Flex
          direction="column"
          className="self-end *:text-right font-bold"
          gap={{ initial: "1", sm: "0" }}
        >
          <Text>{formatDate(new Date(message.createdAt))}</Text>
          <Link
            href={`/${sender?.username}`}
            className={classNames(
              truncatedStyles,
              "hover:text-purple-500 transition-colors"
            )}
          >
            {sender?.name || sender?.username}
          </Link>
          <IoTrashOutline
            color="red"
            className="self-end cursor-pointer mt-4"
            size="24"
            onClick={() => handleDelete(message.id, refetch)}
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
