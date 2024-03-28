import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import ButtonContent from "./ButtonContent";

export default function FavouriteContent({
  isFavourite,
  isLoading,
}: {
  isFavourite: boolean;
  isLoading: boolean;
}) {
  return (
    <ButtonContent
      activeIcon={
        <IoBookmark size="18" className="hover:opacity-60 text-purple-500" />
      }
      inactiveIcon={
        <IoBookmarkOutline size="18" className="hover:opacity-60" />
      }
      isActive={isFavourite}
      isLoading={isLoading}
    />
  );
}
