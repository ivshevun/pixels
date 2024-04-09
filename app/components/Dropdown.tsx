import { Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { BiChevronDown } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

interface DropdownProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentItem: string;
  onOptionChange: (option: string) => void;
  options: string[];
  isCovering?: boolean;
  className?: string;
}

interface DropdownItemProps {
  children: ReactNode;
  currentItem: string;
  onOptionChange: (option: string) => void;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    marginTop: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    padding: "0.5rem",
    marginTop: "0.5rem",
  },
};

export default function Dropdown({
  isOpen,
  setOpen,
  currentItem,
  options,
  onOptionChange,
  className,
  isCovering = false,
}: DropdownProps) {
  return (
    <Flex
      direction="column"
      className={classNames("overflow-visible relative", className)}
    >
      <button
        className="flex justify-between items-center text-left text-sm border border-gray-200 rounded-lg p-4"
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <Text className="capitalize">{currentItem}</Text>
        <BiChevronDown />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            key="dropdown"
            className={classNames(
              "flex flex-col border rounded-lg shadow-md overflow-hidden",
              isCovering && "absolute bg-white top-16 w-full z-10"
            )}
          >
            {options.map((option) => (
              <DropDownItem
                onOptionChange={onOptionChange}
                currentItem={currentItem}
                key={option}
              >
                {option}
              </DropDownItem>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
}

const DropDownItem = ({
  currentItem,
  children,
  onOptionChange,
}: DropdownItemProps) => {
  const isCurrent = currentItem === children;

  return (
    <Flex
      justify="between"
      className={classNames(
        "text-xs font-medium p-2 items-center capitalize cursor-pointer transition-colors duration-200",
        isCurrent && "bg-[#f3f3f4] rounded-md"
      )}
      onClick={() => onOptionChange(children?.toString() || "")}
    >
      <Text>{children}</Text>
      {isCurrent && <TiTick />}
    </Flex>
  );
};
