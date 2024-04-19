import { User } from "@prisma/client";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const useUser = (userId: string): UseQueryResult<AxiosResponse<User>> =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: () => axios.get("/api/user", { params: { userId } }),
  });

export default useUser;
