import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { handleChangeTags } from "@/lib/redux/utils/textHandlers";
import { Tag } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import format from "../../utils/format";
import ComboOption from "./ComboOption";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";

export default function ComboOptions() {
  const { tags: currentTags } = useShotInfo();
  const { isComboboxOpen: isOpen } = useDisclosure();

  const dispatch = useAppDispatch();

  const allTags = Object.values(Tag).filter(
    (tag) => !currentTags.includes(tag)
  );

  const handleChange = (tag: string) => {
    if (currentTags.includes(tag as Tag)) return;

    handleChangeTags([...currentTags, tag], dispatch);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="select"
          initial={{ opacity: 0, height: 0, top: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            top: "80px",
          }}
          exit={{ opacity: 0, height: 0, top: 0 }}
          className="flex flex-col absolute w-full bg-white text-black rounded-lg shadow-2xl overflow-hidden"
        >
          {allTags.slice(0, 6).map((tag) => (
            <ComboOption onClick={() => handleChange(tag)} key={tag}>
              {format(tag)}
            </ComboOption>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
