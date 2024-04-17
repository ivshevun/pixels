import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const fetchLiked = async (shotId: string, userId: string) => {
  const { data }: AxiosResponse<{ liked: boolean }> = await axios.get(
    "/api/like",
    {
      params: { shotId: shotId, userId },
    }
  );
  return data.liked;
};

const useLiked = (shotId: string, userId: string | null) =>
  useQuery({
    queryKey: ["likes", shotId, userId],
    queryFn: () => fetchLiked(shotId, userId || ""),
    enabled: !!userId,
  });

export default useLiked;
