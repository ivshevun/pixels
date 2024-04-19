import { Heading } from "@radix-ui/themes";
import { motion } from "framer-motion";

export default function OAuth({ title }: { title: string }) {
  return (
    <motion.div
      key="header-wrapper"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col w-full items-center"
    >
      <Heading>{title}</Heading>
    </motion.div>
  );
}
