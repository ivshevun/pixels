import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";

// does not work

interface AnimatedFormProps extends HTMLMotionProps<"form"> {
  children: ReactNode;
}

export default function AnimatedForm({ children, ...rest }: AnimatedFormProps) {
  return (
    <motion.form
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      {...rest}
    >
      {children}
    </motion.form>
  );
}
