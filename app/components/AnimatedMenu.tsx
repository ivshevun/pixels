import classNames from "classnames";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

interface Props extends HTMLMotionProps<"div"> {
  children: ReactNode;
  isOpen: boolean;
}

const variants = {
  visible: { opacity: 1, height: "auto" },
  hidden: { opacity: 0, height: 0 },
};

export default function AnimatedMenu({
  children,
  isOpen,
  className,
  ...rest
}: Props) {
  const styles = classNames(
    "flex flex-col absolute left-0 top-[86px] h-auto w-full p-4 gap-3 overflow-hidden bg-white border-t z-10",
    className
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="animated-menu"
          className={styles}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
