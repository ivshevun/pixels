import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useShotImage = (imageUrl: string | undefined) =>
  useQuery({
    queryKey: ["shotImg", imageUrl],
    queryFn: async () => {
      const { data } = await axios.get("/api/shotImage", {
        params: {
          imageUrl,
        },
      });

      return data;
    },
    enabled: !!imageUrl,
  });

export default useShotImage;
