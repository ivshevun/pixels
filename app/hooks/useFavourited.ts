import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const fetchFavourited = async (shotId: string, userId: string) => {
  const {
    data: { favourited },
  }: AxiosResponse<{ favourited: boolean }> = await axios.get(
    "/api/favourite",
    {
      params: { shotId: shotId, userId },
    }
  );
  return favourited;
};

const useFavourited = (shotId: string, userId: string) =>
  useQuery({
    queryKey: ["favourites", shotId, userId],
    queryFn: () => fetchFavourited(shotId, userId),
    enabled: userId !== shotId,
  });

export default useFavourited;
