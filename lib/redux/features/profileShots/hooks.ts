import { useAppSelector } from "../../hooks";

export const useProfileShots = () => {
  const useSelector = useAppSelector();

  return useSelector((state) => state.profileShots);
};
