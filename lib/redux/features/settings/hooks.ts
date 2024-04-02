import { useAppSelector } from "../../hooks";

export const useSettings = () => {
  const useSelector = useAppSelector();

  return useSelector((state) => state.settings);
};
