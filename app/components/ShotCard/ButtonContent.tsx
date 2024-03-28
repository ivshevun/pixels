import { opacityVariants, scaleVariants } from "@/lib/animationVariants";
import { AnimatePresence, motion } from "framer-motion";
import { ImSpinner8 } from "react-icons/im";

export default function ButtonContent({
  isActive,
  isLoading,
  activeIcon,
  inactiveIcon,
}: {
  isActive: boolean;
  isLoading: boolean;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isActive && !isLoading ? (
        <motion.div
          variants={opacityVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={scaleVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {activeIcon}
          </motion.div>
        </motion.div>
      ) : (
        !isLoading && inactiveIcon
      )}
      {isLoading && (
        <motion.div
          variants={opacityVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <ImSpinner8 className="text-purple-500 animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
