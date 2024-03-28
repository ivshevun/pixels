import { useAppSelector } from "../../hooks";

export const useShotInfo = () => {
  const useSelector = useAppSelector();

  return useSelector((state) => state.shotLikes);
};
