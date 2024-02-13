import { opacityVariants } from "@/lib/animationVariants";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

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
          variants={opacityVariants}
          onClick={() => setOverlayed((prevOverlayed) => !prevOverlayed)}
        />
      )}
    </AnimatePresence>
  );
}
