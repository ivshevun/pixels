import classNames from "classnames";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

const variants: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function Overlay({
  isOverlayed,
  setOverlayed,
}: {
  isOverlayed: boolean;
  setOverlayed: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <AnimatePresence>
      {isOverlayed && (
        <motion.div
          className={classNames(
            "fixed w-full h-full top-[86px] left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[5] cursor-pointer"
          )}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          onClick={() => setOverlayed((prevOverlayed) => !prevOverlayed)}
        />
      )}
    </AnimatePresence>
  );
}
