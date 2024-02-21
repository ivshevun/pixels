import { DisclosureProps } from "./Aside";
import Controller from "./Controller";
import { TextOptions } from "./ControllerOptions";

const asideStyles =
  "w-full p-2 hover:bg-gray-100 transition-colors cursor-pointer";
const mobileStyles = "w-full cursor-pointer hover:bg-gray-200 text-center p-16";

export default function BlockController({ isOpen, setOpen }: DisclosureProps) {
  return (
    <Controller isOpen={isOpen} setOpen={setOpen}>
      {/* Aside options */}
      <TextOptions optionStyles={asideStyles} />

      {/* Mobile options */}
      <TextOptions optionStyles={mobileStyles} />
    </Controller>
  );
}
