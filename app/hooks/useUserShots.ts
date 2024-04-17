import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import ms from "ms";

const fetchUserShots = async ({
  pageParam = 1,
  userId,
  orderBy,
}: {
  pageParam: number;
  userId: string;
  orderBy?: string;
}) => {
  const res = await axios.get(`/api/shots/${userId}?page=${pageParam}`, {
    params: { userId, orderBy },
  });

  return {
    ...res.data,
    prevPage: pageParam,
  };
};

const useUserShots = (userId: string, orderBy?: string) =>
  useInfiniteQuery({
    queryKey: ["shots", userId, orderBy],
    queryFn: ({ pageParam = 1 }) =>
      fetchUserShots({ pageParam, userId, orderBy }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return null;
      return lastPage.prevPage + 1;
    },
    initialPageParam: 1,
  });

export default useUserShots;
