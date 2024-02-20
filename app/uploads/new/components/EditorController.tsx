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
import { TextOptions } from "./ControllerOptions";

const asideStyles =
  "w-full p-2 hover:bg-gray-100 transition-colors cursor-pointer";
const mobileStyles = "w-full cursor-pointer hover:bg-gray-200 text-center p-16";

export default function EditorController({ isOpen, setOpen }: DisclosureProps) {
  return (
    <Controller
      isOpen={isOpen}
      setOpen={setOpen}
      title="Insert block"
      isSmall={true}
    >
      <Fragment>
        <TextOptions optionStyles={asideStyles} />
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

const MobileContent = () => {
  const textOptions = ["Heading 1", "Heading 2", "Text"];
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

  const [textIndex, setTextIndex] = useState(0);
  const [currentModifiers, setCurrentModifiers] = useState<string[]>([]);
  const [alignIndex, setAlignIndex] = useState(0);

  const handleTextChange = () => {
    setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);

    // reset current modifiers by default
    setCurrentModifiers([]);

    // Add bold modifier by default to the heading 1 and heading 2
    if (textIndex === 0 || textIndex === 2) setCurrentModifiers(["bold"]);
  };

  const handleModifierClick = (modifierKey: string) => {
    if (!currentModifiers.includes(modifierKey))
      return setCurrentModifiers([...currentModifiers, modifierKey]);

    // does not allow to remove bold modifier from the heading 1 and heading 2
    if (textIndex < 2 && modifierKey === "bold") return;

    // remove modifier if its allowed
    setCurrentModifiers((prevModifiers) =>
      prevModifiers.filter((modifier) => modifier !== modifierKey)
    );
  };

  const handleAlignChange = () =>
    setAlignIndex((prevIndex) => (prevIndex + 1) % aligns.length);

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
        <Text className="text-sm sm:text-base">{textOptions[textIndex]}</Text>
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
                ? "border-purple-900 rounded-lg bg-[rgba(79,60,201,.1)] transition-colors duration-500"
                : "border-transparent",
              textIndex < 2 &&
                modifier.key === "bold" &&
                "border-gray-400 bg-gray-200 rounded-lg"
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
