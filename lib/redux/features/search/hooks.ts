import { useAppSelector } from "../../hooks";

const useSearchQuery = () => {
  const useSelector = useAppSelector();

  return useSelector((state) => state.search);
};

export default useSearchQuery;
