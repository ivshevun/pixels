import { AnimatePresence, motion } from "framer-motion";
import { DisclosureProps } from "./Aside";
import classNames from "classnames";

export default function MobileController({
  isOpen,
  children,
  isSmall,
}: DisclosureProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: "0" }}
          animate={{ opacity: 1, height: isSmall ? "5%" : "40%" }}
          exit={{ opacity: 0, height: "0" }}
          transition={{ duration: 0.3 }}
          className={classNames(
            "flex flex-col lg:hidden w-full fixed bottom-0 bg-white z-10 overflow-hidden shadow-2xl border overflow-y-scroll gap-1",
            !isSmall && "rounded-t-3xl"
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
