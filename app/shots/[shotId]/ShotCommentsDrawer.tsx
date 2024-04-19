"use client";
import DarkButton from "@/app/components/Buttons/DarkButton";
import useComments from "@/app/hooks/useComments";
import useUser from "@/app/hooks/useUser";
import { opacityVariants } from "@/lib/animationVariants";
import log from "@/lib/log";
import { setCommentsOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment as PrismaComment } from "@prisma/client";
import { Avatar, Flex, Heading, Text } from "@radix-ui/themes";
import { UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { z } from "zod";
import CommentSkeleton from "./CommentSkeleton";

const getDrawerWidth = (width: number): string => {
  if (width < 480) {
    return "100%";
  } else if (width >= 480 && width < 768) {
    return "75%";
  }

  return "400px";
};

const commentSchema = z.object({
  comment: z.string().min(3, "Comment is too short"),
});

export type CommentFormData = z.infer<typeof commentSchema>;

export default function ShotCommentsDrawer({ shotId }: { shotId: string }) {
  const dispatch = useAppDispatch();
  const { isCommentsOpen: isOpen } = useDisclosure();
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: "onSubmit",
  });

  const drawerSize = getDrawerWidth(window.innerWidth);

  return (
    <Drawer
      open={isOpen}
      direction="right"
      onClose={() => dispatch(setCommentsOpen(false))}
      size={drawerSize}
      className="flex flex-col gap-4 p-4"
    >
      <RxCross2
        className="cursor-pointer"
        size="28"
        onClick={() => dispatch(setCommentsOpen(false))}
      />
      <DrawerBody form={form} shotId={shotId} />
    </Drawer>
  );
}

const DrawerBody = ({
  form,
  shotId,
}: {
  form: UseFormReturn<CommentFormData, any, undefined>;
  shotId: string;
}) => {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const commentsQuery = useComments(shotId);

  const onSubmit = async (data: CommentFormData) => {
    try {
      await axios.post("/api/comments", {
        ...data,
        shotId,
      });

      toast.success("Successfully commented!");
      form.reset();

      commentsQuery.refetch();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      } else {
        log(error);
      }
      toast.error("Something went wrong");
    }
  };

  return (
    <Flex direction="column" className="items-start w-full gap-4 sm:px-12 py-8">
      <Heading className="font-medium">Feedback</Heading>
      <Flex>
        {session && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <input
              {...form.register("comment")}
              className="outline-none border rounded-l-lg p-3 text-sm"
            />
            <DarkButton
              className="rounded-l-none px-4 text-sm"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </DarkButton>
          </form>
        )}
      </Flex>
      <AnimatePresence>
        {form.formState.errors.comment && (
          <motion.p
            variants={opacityVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-red-500 text-sm"
            transition={{ duration: 0.2 }}
          >
            {form.formState.errors.comment?.message}
          </motion.p>
        )}
        {error && (
          <motion.p
            className="text-red-500"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={opacityVariants}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <Comments queryResult={commentsQuery} />
    </Flex>
  );
};

const Comments = ({
  queryResult,
}: {
  queryResult: UseQueryResult<PrismaComment[], Error>;
}) => {
  const { data: comments, isLoading, isError } = queryResult;

  if (isLoading)
    return [1, 2, 3, 4].map((index) => <CommentSkeleton key={index} />);

  if (isError) {
    return (
      <Text className="text-red-500 text-sm">We couldn`t load comments :(</Text>
    );
  }

  return (
    <Flex direction="column" gap="3">
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Flex>
  );
};

const Comment = ({ comment }: { comment: PrismaComment }) => {
  const { data: response, isLoading } = useUser(comment.userId);
  const author = response?.data;

  if (isLoading) return <CommentSkeleton />;

  return (
    <motion.div
      className="flex gap-2"
      variants={opacityVariants}
      animate="visible"
    >
      <Link href={`/${author?.username}`}>
        <Avatar
          src={author?.image || ""}
          alt="Author image"
          fallback="?"
          radius="full"
          size="1"
        />
      </Link>
      <Flex direction="column">
        <Link href={`/${author?.username}`}>
          {author?.username || author?.name}
        </Link>
        <Text className="text-sm font-normal">{comment.text}</Text>
      </Flex>
    </motion.div>
  );
};
