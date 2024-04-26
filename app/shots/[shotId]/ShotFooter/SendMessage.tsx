"use client";
import { User } from "@prisma/client";
import { Avatar, Dialog, Text } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";
import { z } from "zod";
import MessageForm from "./MessageForm";

export const messageSchema = z.object({
  title: z.string().min(2, "Title is too short").max(20, "Title is too long"),
  message: z
    .string()
    .min(3, "Message is too short")
    .max(255, "Message is too long"),
});

export type MessageFormData = z.infer<typeof messageSchema>;

export default function SendMessage({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title className="flex items-center gap-3 font-medium">
          <Avatar
            src={user.image || ""}
            alt="User image"
            fallback="?"
            radius="full"
          />
          <Text className="text-sm sm:text-xl font-medium md:text-xl">
            Let`s get your request ready to send
          </Text>
          <Dialog.Close className="ml-auto cursor-pointer">
            <RxCross2 />
          </Dialog.Close>
        </Dialog.Title>
        <MessageForm recipientId={user.id} />
      </Dialog.Content>
    </Dialog.Root>
  );
}
