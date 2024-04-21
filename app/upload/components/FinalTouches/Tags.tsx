import { setComboboxOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { handleChangeTags } from "@/lib/redux/utils/textHandlers";
import { Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import format from "../../utils/format";

export default function Tags({
  content,
  setContent,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}) {
  const { tags: currentTags } = useShotCreationInfo();

  const dispatch = useAppDispatch();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (currentTags.includes(content.trim())) {
        toast.error("Tag already exists");
        return setContent("");
      }

      if (currentTags.length >= 5) {
        toast.error("Maximum of 5 tags allowed");
        return setContent("");
      }

      if (content.trim() === "") {
        return toast.error("You cannot add an empty tag");
      }

      handleChangeTags([...currentTags, content.trim()], dispatch);
      setContent("");
      dispatch(setComboboxOpen(false));
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLSpanElement) {
      event.stopPropagation();
      const deletedTag = event.target.id;
      handleChangeTags(
        [...currentTags.filter((tag) => tag !== deletedTag)],
        dispatch
      );
    }
  };

  return (
    <React.Fragment>
      <input
        onKeyDown={handleKeyDown}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="px-2 w-full flex gap-4 py-2 text-sm font-medium border dark:border-white hover:shadow-3xl rounded-lg focus:border-purple-950 focus:shadow-3xl outline-none placeholder:text-gray-300 whitespace-nowrap empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 overflow-hidden"
        maxLength={14}
        onFocus={() => dispatch(setComboboxOpen(true))}
        onBlur={() => dispatch(setComboboxOpen(false))}
        placeholder="Add tags..."
      />
      <AnimatePresence>
        <Text
          className={classNames(
            "text-red-500 text-sm transition-all duration-300",
            currentTags.length ? "opacity-0" : "opacity-1"
          )}
        >
          This field is required!
        </Text>
      </AnimatePresence>
      <Flex
        align="center"
        className="overflow-x-clip flex-wrap max-h-48 md:max-h-24"
        direction={{ initial: "column", sm: "row" }}
        gap="2"
      >
        {currentTags.map((tag) => (
          <Flex
            key={tag}
            className="text-sm items-center bg-gray-200 hover:scale-105 transition-transform duration-300 px-2 py-1 rounded-lg cursor-default justify-center"
            gap="2"
          >
            {format(tag)}
            <span
              className="text-gray-500 rounded-xl px-2 hover:bg-[#5b5a64] hover:text-white transition-colors duration-300"
              id={tag}
              onClick={handleClick}
            >
              x
            </span>
          </Flex>
        ))}
      </Flex>
    </React.Fragment>
  );
}
