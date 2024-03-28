import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ButtonContent from "./ButtonContent";

const LikeContent = ({
  isLiked,
  isLoading,
}: {
  isLiked: boolean;
  isLoading: boolean;
}) => {
  return (
    <ButtonContent
      isActive={isLiked}
      isLoading={isLoading}
      activeIcon={
        <FaHeart size="16" className="hover:opacity-60 text-purple-500" />
      }
      inactiveIcon={<FaRegHeart size="16" className="hover:opacity-60" />}
    />
  );
};

export default LikeContent;
