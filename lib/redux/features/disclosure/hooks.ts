import { useAppSelector } from "../../hooks";

export const useDisclosure = () => {
  // arrange custom selector hook
  const useSelector = useAppSelector();

  // return disclosure
  return useSelector((state) => state.disclosure);
};
