import { AnimatePresence, motion } from "framer-motion";
import { DisclosureProps } from "./Aside";

export default function MobileController({
  isOpen,
  children,
}: DisclosureProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: "0" }}
          animate={{ opacity: 1, height: "40%" }}
          exit={{ opacity: 0, height: "0" }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:hidden w-full fixed bottom-0 bg-white z-10 overflow-hidden shadow-2xl border rounded-t-3xl overflow-y-scroll gap-1"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
