import { useShotInfo } from "@/lib/redux/features/shotCreation/hooks";
import {
  handleChangeFont,
  handleChangeModifiers,
} from "@/lib/redux/utils/textHandlers";
import Dropdown from "./Dropdown";
import { EditorProps } from "./Editor/EditorController";
import { useShotTextInfo } from "@/lib/redux/features/shotText/hooks";

const textOptions = ["heading 1", "heading 2", "text"];
export default function FontDropdown({ editor }: EditorProps) {
  const { currentFont } = useShotTextInfo();

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
