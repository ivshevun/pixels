import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  handleChangeAlign,
  handleChangeFont,
  handleChangeModifiers,
} from "@/lib/redux/utils/textHandlers";
import { Flex, Text } from "@radix-ui/themes";
import { Editor } from "@tiptap/react";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { BiUnderline } from "react-icons/bi";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { VscBold } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import ButtonGroup from "./ButtonGroup";
import Controller from "./Controller";
import FontDropdown from "./FontDropdown";

interface EditorProps {
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

const fontModifiers = [
  <VscBold key="bold" size="20" />,
  <GoItalic key="italic" size="20" />,
  <BiUnderline key="underline" size="20" />,
];

const alignComponents: Components = {
  left: <FaAlignLeft key="left" />,
  center: <FaAlignCenter key="center" />,
  right: <FaAlignRight key="right" />,
};

export const AsideContent = ({ editor }: EditorProps) => {
  const { currentModifiers, align, currentFont } = useShotInfo();
  return (
    <Flex direction="column" gap="6">
      <FontDropdown />
      <ButtonGroup
        icons={fontModifiers}
        activeElements={currentModifiers}
        setActiveElements={handleChangeModifiers}
        currentFont={currentFont}
      />
      <ButtonGroup
        icons={Object.values(alignComponents)}
        activeElement={align}
        setActiveElement={handleChangeAlign}
      />
    </Flex>
  );
};

const textOptions = ["heading 1", "heading 2", "text"];
const MobileContent = ({ editor }: EditorProps) => {
  const aligns = ["left", "right", "center"];

  const { currentModifiers } = useShotInfo();
  const dispatch = useAppDispatch();

  const [textIndex, setTextIndex] = useState(0);
  const [alignIndex, setAlignIndex] = useState(0);

  const handleTextChange = () => {
    // change text index
    setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);

    handleChangeFont(
      textOptions[(textIndex + 1) % textOptions.length],
      dispatch
    );

    // reset current modifiers by default
    handleChangeModifiers([], dispatch);

    // Add bold modifier by default to the heading 1 and heading 2
    if (textIndex === 0 || textIndex === 2)
      handleChangeModifiers(["bold"], dispatch);
  };

  const handleModifierClick = (modifierKey: string) => {
    if (!currentModifiers.includes(modifierKey))
      return handleChangeModifiers(
        [...currentModifiers, modifierKey],
        dispatch
      );

    // does not allow to remove bold modifier from the heading 1 and heading 2
    if (textIndex < 2 && modifierKey === "bold") return;

    // remove modifier if its allowed

    const filteredModifiers = currentModifiers.filter(
      (modifier) => modifier !== modifierKey
    );

    handleChangeModifiers(filteredModifiers, dispatch);
  };

  const handleAlignChange = () => {
    setAlignIndex((prevIndex) => (prevIndex + 1) % aligns.length);
    handleChangeAlign(aligns[(alignIndex + 1) % aligns.length], dispatch);
  };

  return (
    <Flex
      justify="between"
      align="center"
      height="100%"
      width="100%"
      className="px-4"
    >
      <Flex
        align="center"
        gap="1"
        onClick={handleTextChange}
        className="cursor-pointer w-1/3"
      >
        <Text className="text-sm sm:text-base capitalize">
          {textOptions[textIndex]}
        </Text>
        <IoIosArrowDown size="14" />
      </Flex>
      <Flex justify="center" align="center" gap="1" className="w-1/3">
        {fontModifiers.map((modifier) => (
          <Flex
            onClick={() => handleModifierClick(modifier.key as string)}
            align="center"
            className={classNames(
              "cursor-pointer p-1 border-2",
              currentModifiers.includes(modifier.key!)
                ? "rounded-lg bg-[rgba(79,60,201,.1)] transition-colors duration-500 border-purple-900 "
                : "border-transparent",
              textIndex < 2 &&
                modifier.key === "bold" &&
                "border-zinc-400 bg-gray-200 rounded-lg cursor-default"
            )}
            key={modifier.key}
          >
            {modifier}
          </Flex>
        ))}
      </Flex>
      <Flex
        justify="end"
        className="cursor-pointer w-1/3"
        onClick={handleAlignChange}
      >
        {alignComponents[aligns[alignIndex]]}
      </Flex>
    </Flex>
  );
};
