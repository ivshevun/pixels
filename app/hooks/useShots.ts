import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";

const fetchShots = async ({ pageParam = 1 }: { pageParam: number }) => {
  const res = await fetch(`/api/shots?page=${pageParam}`);

  const data = await res.json();

  return { ...data, prevPage: pageParam };
};

const useShots = () =>
  useInfiniteQuery({
    queryKey: ["shots"],
    queryFn: ({ pageParam = 1 }) => fetchShots({ pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return null;
      return lastPage.prevPage + 1;
    },
    initialPageParam: 1,
    staleTime: ms("24h"), // 24 hours
  });

export default useShots;
