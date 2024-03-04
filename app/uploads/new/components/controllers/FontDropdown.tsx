import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import {
  handleChangeFont,
  handleChangeModifiers,
} from "@/lib/redux/utils/textHandlers";
import Dropdown from "./Dropdown";
import { EditorProps } from "./EditorController";

const textOptions = ["heading 1", "heading 2", "text"];
export default function FontDropdown({ editor }: EditorProps) {
  const { currentFont } = useShotInfo();

  return (
    <Dropdown
      options={textOptions}
      currentItem={currentFont}
      setCurrentItem={handleChangeFont}
      changeModifiers={handleChangeModifiers}
      editor={editor}
    />
  );
}
