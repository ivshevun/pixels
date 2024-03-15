import { setComboboxOpen as setOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { handleChangeTags } from "@/lib/redux/utils/textHandlers";
import { Text } from "@radix-ui/themes";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import React from "react";
import ContentEditable from "react-contenteditable";
import format from "../../utils/format";

export default function Tags({}: {}) {
  const { tags: currentTags } = useShotInfo();

  const dispatch = useAppDispatch();

  const handleContentChange = React.useCallback(() => {
    // do nothing to prevent default behavior (editing)
    return;
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    return event.preventDefault();
  };

  const generateTag = (tag: string) => {
    return `<span class="flex gap-2 text-sm items-center bg-gray-200 hover:scale-105 transition-transform duration-300 px-2 py-1 rounded-lg cursor-default" contentEditable="false">
        ${format(tag)}
        <span class="text-gray-500 rounded-xl px-2 hover:bg-[#5b5a64] hover:text-white transition-colors duration-300" id="${tag}">x</span>
        </span>`;
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
      <ContentEditable
        onChange={handleContentChange}
        onClick={handleClick}
        onFocus={() =>
          // set timeout to handle onClick first, then onFocus
          setTimeout(() => {
            dispatch(setOpen(true));
          }, 100)
        }
        onBlur={() => dispatch(setOpen(false))}
        html={currentTags.map((tag) => generateTag(tag)).join(" ")}
        className="px-1 w-full flex gap-4 py-2 text-md font-normal border dark:border-white hover:shadow-3xl rounded-lg focus:border-purple-950 focus:shadow-3xl outline-none placeholder:text-gray-300 whitespace-nowrap empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 overflow-hidden"
        data-placeholder="Add tags..."
        onKeyDown={handleKeyDown}
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
    </React.Fragment>
  );
}
