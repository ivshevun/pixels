import TransparentButton from "@/app/[username]/components/TransparentButton";
import { Separator, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";

export default function BlockInserter({
  isMobile,
  setOpen,
  file,
}: {
  isMobile: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  file: File | null;
}) {
  return (
    file && (
      <motion.div
        className="flex items-center justify-between w-screen overflow-hidden"
        initial={{ paddingTop: isMobile ? "250px" : "0" }}
        animate={{ paddingTop: isMobile ? "250px" : "0" }}
        transition={{ duration: 0.3 }}
      >
        <Separator className="flex-1" />
        <TransparentButton
          className="px-24 py-4 flex items-center gap-2 font-normal"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <FaPlus />
          <Text>Insert Block</Text>
        </TransparentButton>
        <Separator className="flex-1" />
      </motion.div>
    )
  );
}
