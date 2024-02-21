import { Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

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
  currentItem,
  setCurrentItem,
  options,
}: {
  currentItem: string;
  setCurrentItem: Dispatch<SetStateAction<string>>;
  options: string[];
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Flex direction="column" className="overflow-hidden">
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
            className="flex flex-col border rounded-lg shadow-md overflow-hidden"
          >
            {options.map((option) => (
              <DropDownItem
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
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
  setCurrentItem,
  children,
}: {
  currentItem: string;
  setCurrentItem: Dispatch<SetStateAction<string>>;
  children: ReactNode;
}) => {
  const isCurrent = currentItem === children;

  return (
    <Flex
      justify="between"
      className={classNames(
        "text-xs font-medium p-2 items-center capitalize cursor-pointer transition-colors duration-200",
        isCurrent && "bg-[#f3f3f4] rounded-md"
      )}
      onClick={() => setCurrentItem(children?.toString() || "")}
    >
      <Text>{children}</Text>
      {isCurrent && <TiTick />}
    </Flex>
  );
};
