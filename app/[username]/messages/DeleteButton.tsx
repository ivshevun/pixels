import { FetchMessagesReturn } from "@/app/hooks/useMyMessages";
import log from "@/lib/log";
import {
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";

export type RefetchType = (
  options?: RefetchOptions | undefined
) => Promise<
  QueryObserverResult<InfiniteData<FetchMessagesReturn, unknown>, Error>
>;

export default function DeleteButton({
  messageId,
  refetch,
}: {
  messageId: string;
  refetch: RefetchType;
}) {
  return (
    <IoTrashOutline
      onClick={() => handleDelete(messageId, refetch)}
      size="24"
      color="red"
    />
  );
}

export const handleDelete = async (messageId: string, refetch: RefetchType) => {
  try {
    await axios.delete("/api/message", {
      data: {
        messageId,
      },
    });
    toast.success("Message deleted");
    refetch();
  } catch (err) {
    log(err);
    toast.error("Something went wrong. Try again later");
  }
};
