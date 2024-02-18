import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

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

const asideOption = "p-2 hover:bg-gray-100 transition-colors cursor-pointer";

export default function Aside({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 w-1/5 bg-white shadow-xl p-8 fixed right-0 h-full overflow-y-auto "
        >
          <Text
            onClick={() => setOpen(false)}
            className="text-left font-light text-base cursor-pointer"
          >
            Close
          </Text>

          <Heading className="font-normal">Insert block</Heading>
          <Separator className="w-full" />

          <Box>
            <Flex direction="column" gap="1">
              <Heading size="4" className={asideOption}>
                Heading
              </Heading>
              <Box className={asideOption}>
                <Heading size="4">Heading</Heading>
                <Text>with text</Text>
              </Box>
              <Text className={asideOption}>Text</Text>
            </Flex>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
