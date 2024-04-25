"use client";
import ErrorHandling from "@/app/auth/components/ErrorHandling";
import DarkButton from "@/app/components/Buttons/DarkButton";
import Input from "@/app/components/Input";
import log from "@/lib/log";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, TextArea } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MessageFormData, messageSchema } from "./SendMessage";

export default function MessageForm({ recipientId }: { recipientId: string }) {
  const [error, setError] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: MessageFormData) => {
    try {
      await axios.post("/api/message", {
        ...data,
        recipientId,
      });

      toast.success("Message sent");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      }
      log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full items-center gap-4"
    >
      <Flex direction="column" className="w-full sm:w-4/5">
        <label htmlFor="title" className="text-base">
          Title
        </label>
        <Input placeholder="Your design..." register={register("title")} />
      </Flex>
      <Flex direction="column" className="w-full sm:w-4/5">
        <label htmlFor="message" className="text-base">
          Message
        </label>
        <TextArea
          {...register("message")}
          className="hover:shadow-3xl focus:shadow-3xl focus:border-purple-500"
          placeholder="Hello! Saw your..."
        />
      </Flex>
      <ErrorHandling errors={errors} networkError={error} />
      <DarkButton
        disabled={isSubmitting}
        className="w-full xs:w-1/2 sm:w-1/3 py-3"
      >
        Submit
      </DarkButton>
    </form>
  );
}
