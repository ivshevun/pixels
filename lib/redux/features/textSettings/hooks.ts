import { useAppSelector } from "../../hooks"

export const useTextSettings = () => {
  const useSelector = useAppSelector();

  return useSelector((state) => state.text);
}