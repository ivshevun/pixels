import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import {
  handleChangeAlign,
  handleChangeModifiers,
} from "@/lib/redux/utils/textHandlers";
import { Flex } from "@radix-ui/themes";
import { Editor } from "@tiptap/react";
import { Fragment, useEffect } from "react";
import { BiUnderline } from "react-icons/bi";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { VscBold } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import ButtonGroup from "../ButtonGroup";
import Controller from "../Controller";
import FontDropdown from "../FontDropdown";
import MobileContent from "./MobileContent";
import { synchronizeEditor } from "./utils";

export interface EditorProps {
  editor: Editor | null;
}

export default function EditorController({ editor }: EditorProps) {
  const dispatch = useDispatch();
  const { isEditorOpen } = useDisclosure();

  return (
    <Controller
      isOpen={isEditorOpen}
      setOpen={(isOpen) => dispatch(setEditorOpen(isOpen))}
      title="Text Block"
      isSmall={true}
    >
      <Fragment>
        <AsideContent editor={editor} />
      </Fragment>
      <Fragment>
        <MobileContent editor={editor} />
      </Fragment>
    </Controller>
  );
}

type Components = {
  [key: string]: JSX.Element;
};

export const fontModifiers = [
  <VscBold key="bold" size="20" />,
  <GoItalic key="italic" size="20" />,
  <BiUnderline key="underline" size="20" />,
];

export const alignComponents: Components = {
  left: <FaAlignLeft key="left" />,
  center: <FaAlignCenter key="center" />,
  right: <FaAlignRight key="right" />,
};

export const AsideContent = ({ editor }: EditorProps) => {
  const { currentModifiers, align, currentFont, shotDescription } =
    useShotInfo();

  useEffect(
    () => synchronizeEditor(editor, currentFont),
    [shotDescription, currentFont, editor]
  );

  return (
    <Flex direction="column" gap="6">
      <FontDropdown editor={editor} />
      <ButtonGroup
        icons={fontModifiers}
        activeElements={currentModifiers}
        setActiveElements={handleChangeModifiers}
        currentFont={currentFont}
        editor={editor}
      />
      <ButtonGroup
        icons={Object.values(alignComponents)}
        activeElement={align}
        setActiveElement={handleChangeAlign}
        editor={editor}
      />
    </Flex>
  );
};
