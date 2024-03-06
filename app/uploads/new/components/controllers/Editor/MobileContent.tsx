import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  handleChangeAlign,
  handleChangeFont,
  handleChangeModifiers,
} from "@/lib/redux/utils/textHandlers";
import { Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  EditorProps,
  alignComponents,
  fontModifiers,
} from "./EditorController";

const textOptions = ["text", "heading 1", "heading 2"];
export default function MobileContent({ editor }: EditorProps) {
  const aligns = ["left", "right", "center"];

  const { currentModifiers, currentFont, shotDescription } = useShotInfo();
  const isHeading = currentFont === "heading 1" || currentFont === "heading 2";
  const dispatch = useAppDispatch();

  const [textIndex, setTextIndex] = useState(0);
  const [alignIndex, setAlignIndex] = useState(0);

  const handleTextChange = () => {
    const currentTextIndex = (textIndex + 1) % textOptions.length;
    // change text index
    setTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);

    handleChangeFont(textOptions[currentTextIndex], dispatch, editor);

    // reset current modifiers by default
    handleChangeModifiers([], dispatch, editor);
  };

  const handleModifierClick = (modifierKey: string) => {
    if (!currentModifiers.includes(modifierKey))
      return handleChangeModifiers(
        [...currentModifiers, modifierKey],
        dispatch,
        editor
      );

    // does not allow to remove bold modifier from the heading 1 and heading 2
    if (isHeading && modifierKey === "bold") return;

    // remove modifier if its allowed
    const focusedEditor = editor?.chain().focus();
    const deleteCommands: Record<string, () => void> = {
      bold: () => focusedEditor?.unsetBold().run(),
      italic: () => focusedEditor?.unsetItalic().run(),
      underline: () => focusedEditor?.unsetUnderline().run(),
    };
    currentModifiers.forEach((modifier) => deleteCommands[modifier]());

    const filteredModifiers = currentModifiers.filter(
      (modifier) => modifier !== modifierKey
    );

    handleChangeModifiers(filteredModifiers, dispatch, editor);
  };

  const handleAlignChange = () => {
    setAlignIndex((prevIndex) => (prevIndex + 1) % aligns.length);
    handleChangeAlign(
      aligns[(alignIndex + 1) % aligns.length],
      dispatch,
      editor
    );
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
        <Text className="text-sm sm:text-base capitalize">{currentFont}</Text>
        <IoIosArrowDown size="14" />
      </Flex>
      <Flex justify="center" align="center" gap="1" className="w-1/3">
        {fontModifiers.map((modifier) => (
          <Flex
            onClick={() => handleModifierClick(modifier.key as string)}
            align="center"
            className={classNames(
              "cursor-pointer p-1 border-2",
              editor?.isActive(modifier.key!)
                ? "rounded-lg bg-[rgba(79,60,201,.1)] transition-colors duration-500 border-purple-900 "
                : "border-transparent",
              isHeading &&
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
}
