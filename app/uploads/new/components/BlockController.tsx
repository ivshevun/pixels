import { setBlockInserterOpen as setBlockOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import Controller from "./Controller";
import { BlockOptions } from "./ControllerOptions";

const asideStyles =
  "w-full p-2 hover:bg-gray-100 transition-colors cursor-pointer";
const mobileStyles = "w-full cursor-pointer hover:bg-gray-200 text-center p-16";

export default function BlockController() {
  const dispatch = useAppDispatch();
  const { isBlockInserterOpen: isBlockOpen } = useDisclosure();

  return (
    <Controller
      title="Insert Block"
      isOpen={isBlockOpen}
      setOpen={(isOpen) => dispatch(setBlockOpen(isOpen))}
    >
      {/* Aside options */}
      <BlockOptions optionStyles={asideStyles} />

      {/* Mobile options */}
      <BlockOptions optionStyles={mobileStyles} />
    </Controller>
  );
}
