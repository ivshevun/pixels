import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser = (userId: string) =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: () => axios.get("/api/user", { params: { userId } }),
  });

export default useUser;
