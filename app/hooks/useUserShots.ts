import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserShots = (userId: string, orderBy?: string) =>
  useQuery({
    queryKey: ["shots", userId, orderBy],
    queryFn: () =>
      axios.get(`/api/shots/${userId}`, { params: { userId, orderBy } }),
  });

export default useUserShots;
