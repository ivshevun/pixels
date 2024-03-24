import { useAppSelector } from "../../hooks";

export const useShotCreationInfo = () => {
  const useSelector = useAppSelector();

  return useSelector((state) => state.shotCreation);
};
