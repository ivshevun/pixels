import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useShots = (userId: string, orderBy?: string) =>
  useQuery({
    queryKey: ["shots", userId, orderBy],
    queryFn: () => axios.get("/api/shots", { params: { userId, orderBy } }),
  });

export default useShots;
