import { useAppSelector } from "../../hooks";

const useSearchQuery = () => {
  const useSelector = useAppSelector();

  return useSelector((state) => state.searchQuery);
};

export default useSearchQuery;
