import { useTextSettings } from "@/lib/redux/features/textSettings/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  handleChangeAlign,
  handleChangeFont,
  handleChangeModifiers,
} from "@/lib/redux/utils/textHandlers";
import { Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { BiUnderline } from "react-icons/bi";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { VscBold } from "react-icons/vsc";
import { DisclosureProps } from "./Aside";
import Controller from "./Controller";
import FontDropdown from "./FontDropdown";

export default function EditorController({ isOpen, setOpen }: DisclosureProps) {
  return (
    <Controller
      isOpen={isOpen}
      setOpen={setOpen}
      title="Text Block"
      isSmall={true}
    >
      <Fragment>
        <AsideContent />
      </Fragment>
      <Fragment>
        <MobileContent />
      </Fragment>
    </Controller>
  );
}

type Components = {
  [key: string]: JSX.Element;
};

export const AsideContent = () => {
  return <FontDropdown />;
};

const textOptions = ["heading 1", "heading 2", "text"];
const MobileContent = () => {
  const aligns = ["left", "right", "center"];
  const alignComponents: Components = {
    left: <FaAlignLeft />,
    right: <FaAlignRight />,
    center: <FaAlignCenter />,
  };
  const fontModifiers = [
    <VscBold key="bold" />,
    <GoItalic key="italic" />,
    <BiUnderline key="underline" />,
  ];

  const { currentModifiers } = useTextSettings();
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
                ? "rounded-lg bg-[rgba(79,60,201,.1)] transition-colors duration-500"
                : "border-transparent",
              currentModifiers.includes(modifier.key!) && "border-purple-900",
              textIndex < 2 &&
                modifier.key === "bold" &&
                "border-[#9e9ea7] bg-gray-200 rounded-lg"
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
