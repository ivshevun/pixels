import { useTextSettings } from "@/lib/redux/features/textSettings/hooks";
import {
  handleChangeFont,
  handleChangeModifiers,
} from "@/lib/redux/utils/textHandlers";
import Dropdown from "./Dropdown";

const textOptions = ["heading 1", "heading 2", "text"];
export default function FontDropdown() {
  const { currentFont } = useTextSettings();

  return (
    <Dropdown
      options={textOptions}
      currentItem={currentFont}
      setCurrentItem={handleChangeFont}
      changeModifiers={handleChangeModifiers}
    />
  );
}
