import { Heading, Separator, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: "0",
  },
};

export interface DisclosureProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  isSmall?: boolean;
}

export function Aside({ isOpen, setOpen, children, title }: DisclosureProps) {
  return (
    <AnimatePresence>
      {isOpen && window.innerWidth > 1024 && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="hidden lg:flex flex-col gap-4 w-1/5 bg-white shadow-xl p-8 fixed right-0 top-0 h-full overflow-y-auto z-10 "
        >
          <Text
            onClick={() => setOpen(false)}
            className="text-left font-light text-base cursor-pointer"
          >
            Close
          </Text>

          {/* Heading */}
          <Heading className="font-normal text-2xl">{title}</Heading>
          <Separator className="w-full" />

          {/* Content */}
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
