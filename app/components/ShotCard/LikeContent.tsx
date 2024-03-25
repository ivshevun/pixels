import { opacityVariants, scaleVariants } from "@/lib/animationVariants";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";

const LikeContent = ({
  isLiked,
  isLoading,
}: {
  isLiked: boolean;
  isLoading: boolean;
}) => {
  return (
    <AnimatePresence>
      {isLiked && !isLoading ? (
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
            <FaHeart size="16" className="hover:opacity-60 text-purple-500" />
          </motion.div>
        </motion.div>
      ) : (
        !isLoading && <FaRegHeart size="16" className="hover:opacity-60" />
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
};

export default LikeContent;
