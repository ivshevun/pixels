import { useAppSelector } from "../../hooks";

export const useShotTextInfo = () => {
  const useSelector = useAppSelector();

  return useSelector((state) => state.shotTextInfo);
};
