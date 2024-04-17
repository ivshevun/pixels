import { useInfiniteQuery } from "@tanstack/react-query";

const fetchShotsByQuery = async ({
  pageParam = 1,
  query,
}: {
  pageParam: number;
  query?: string;
}) => {
  const res = query
    ? await fetch(`/api/search?query=${query}&page=${pageParam}`)
    : await fetch(`/api/shots?page=${pageParam}`);

  const data = await res.json();

  return { ...data, prevPage: pageParam };
};

const useShotsByQuery = (query?: string) =>
  useInfiniteQuery({
    queryKey: ["shots", query],
    queryFn: ({ pageParam = 1 }) => fetchShotsByQuery({ pageParam, query }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return null;
      return lastPage.prevPage + 1;
    },
    initialPageParam: 1,
  });

export default useShotsByQuery;
