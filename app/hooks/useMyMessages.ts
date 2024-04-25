import { Message } from "@prisma/client";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

export interface FetchMessagesReturn {
  messages: Message[];
  messageCount: number;
  hasNextPage: boolean;
  prevPage: number;
}

const fetchMessages = async ({
  pageParam = 1,
  recipientId,
}: {
  pageParam: number;
  recipientId: string;
}) => {
  const res = await fetch(`/api/message/${recipientId}?page=${pageParam}`);

  const data = await res.json();

  return { ...data, prevPage: pageParam };
};

const useMyMessages = (
  recipientId: string
): UseInfiniteQueryResult<InfiniteData<FetchMessagesReturn>> =>
  useInfiniteQuery({
    queryKey: ["messages", recipientId],
    queryFn: ({ pageParam = 1 }) => fetchMessages({ pageParam, recipientId }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return null;
      return lastPage.prevPage + 1;
    },
    initialPageParam: 1,
  });

export default useMyMessages;
