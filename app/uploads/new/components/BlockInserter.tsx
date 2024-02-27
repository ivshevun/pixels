import TransparentButton from "@/app/[username]/components/TransparentButton";
import { setBlockInserterOpen as setBlockOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Separator, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";

export default function BlockInserter({
  isMobile,
  file,
}: {
  isMobile: boolean;
  file: File | null;
}) {
  const dispatch = useAppDispatch();
  const { isBlockInserterOpen: isBlockOpen } = useDisclosure();

  return (
    file && (
      <motion.div
        className="flex items-center justify-between w-screen overflow-hidden"
        initial={{
          paddingTop: isMobile ? "150px" : "0",
          paddingBottom: isMobile ? "125px" : "0",
        }}
        animate={{
          paddingTop: isMobile ? "150px" : "0",
          paddingBottom: isMobile ? "125px" : "0",
        }}
        transition={{ duration: 0.3 }}
      >
        <Separator className="flex-1" />
        <TransparentButton
          className="px-24 py-4 flex items-center gap-2 font-normal"
          onClick={() => dispatch(setBlockOpen(!isBlockOpen))}
        >
          <FaPlus />
          <Text>Insert Block</Text>
        </TransparentButton>
        <Separator className="flex-1" />
      </motion.div>
    )
  );
}
