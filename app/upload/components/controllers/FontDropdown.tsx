import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import {
  handleChangeFont,
  handleChangeModifiers,
} from "@/lib/redux/utils/textHandlers";
import Dropdown from "../../../components/Dropdown";
import { EditorProps } from "./Editor/EditorController";
import { useShotTextInfo } from "@/lib/redux/features/shotText/hooks";
import { useState } from "react";
import { changeModifiers } from "@/lib/redux/features/shotText/shotTextInfo";
import { useAppDispatch } from "@/lib/redux/hooks";

const textOptions = ["heading 1", "heading 2", "text"];
export default function FontDropdown({ editor }: EditorProps) {
  const dispatch = useAppDispatch();
  const { currentFont } = useShotTextInfo();
  const [isOpen, setOpen] = useState(false);

  const handleOptionChange = (option: string) => {
    handleChangeFont(option, dispatch, editor);

    handleChangeModifiers([], dispatch, editor);

    setOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={setOpen}
      options={textOptions}
      currentItem={currentFont}
      onOptionChange={handleOptionChange}
    />
  );
}
