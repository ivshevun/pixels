import { Comment, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const useComments = (shotId: string) =>
  useQuery({
    queryKey: ["comments", shotId],
    queryFn: async () => {
      const { data }: AxiosResponse<Comment[]> = await axios.get(
        "/api/comments",
        {
          params: {
            shotId,
          },
        }
      );

      return data;
    },
  });

export default useComments;
