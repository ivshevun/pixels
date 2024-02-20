import { DisclosureProps } from "./Aside";
import Controller from "./Controller";
import { TextOptions } from "./ControllerOptions";

const asideStyles =
  "w-full p-2 hover:bg-gray-100 transition-colors cursor-pointer";
const mobileStyles = "w-full cursor-pointer hover:bg-gray-200 text-center p-16";

export default function EditorController({ isOpen, setOpen }: DisclosureProps) {
  return (
    <Controller isOpen={isOpen} setOpen={setOpen} title="Insert block">
      <TextOptions optionStyles={asideStyles} />
      <TextOptions optionStyles={mobileStyles} />
    </Controller>
  );
}
