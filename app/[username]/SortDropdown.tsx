import { useProfileShots } from "@/lib/redux/features/profileShots/hooks";
import { changeSortBy } from "@/lib/redux/features/profileShots/profileShotsSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import classNames from "classnames";
import { useState } from "react";
import Dropdown from "../components/Dropdown";

export default function SortDropdown({ className }: { className?: string }) {
  const [isOpen, setOpen] = useState(false);
  const { sortBy } = useProfileShots();
  const dispatch = useAppDispatch();

  const onOptionChange = (option: string) => {
    dispatch(changeSortBy(option));
    setOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={setOpen}
      currentItem={sortBy}
      onOptionChange={onOptionChange}
      options={["Recent shots", "Popular shots"]}
      isCovering={true}
      className={classNames(className)}
    />
  );
}
