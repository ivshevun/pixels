import { Heading, Separator } from "@radix-ui/themes";
import { motion } from "framer-motion";
import React from "react";
import GoogleButton from "./GoogleButton";

export default function OAuth({ title }: { title: string }) {
  return (
    <motion.div
      key="header-wrapper"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col w-full items-center"
    >
      <Heading>{title}</Heading>
      <GoogleButton className="mt-5 w-full flex justify-center" />
    </motion.div>
  );
}
