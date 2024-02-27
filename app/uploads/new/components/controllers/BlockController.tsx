import { setBlockInserterOpen as setBlockOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Box, Heading, Text } from "@radix-ui/themes";
import { Fragment } from "react";
import Controller from "./Controller";

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

const BlockOptions = ({ optionStyles }: { optionStyles: string }) => {
  return (
    <Fragment>
      <Heading size="4" className={optionStyles}>
        Heading
      </Heading>
      <Box className={optionStyles}>
        <Heading size="4">Heading</Heading>
        <Text>with text</Text>
      </Box>
      <Text className={optionStyles}>Text</Text>
    </Fragment>
  );
};
