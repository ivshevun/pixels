import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, Fragment, SetStateAction } from "react";

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

const asideOption =
  "w-full p-2 hover:bg-gray-100 transition-colors cursor-pointer";

interface DisclosureProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Aside({ isOpen, setOpen }: DisclosureProps) {
  return (
    <Fragment>
      <AnimatePresence>
        {isOpen && window.innerWidth > 1024 && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="hidden lg:flex flex-col gap-4 w-1/5 bg-white shadow-xl p-8 fixed right-0 h-full overflow-y-auto "
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

      {/* Editor controller for mobile */}
      <MobileControls isOpen={isOpen} setOpen={setOpen} />
    </Fragment>
  );
}

const mobileOption = "w-full cursor-pointer hover:bg-gray-200 text-center p-16";

const MobileControls = ({ isOpen, setOpen }: DisclosureProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: "0" }}
          animate={{ opacity: 1, height: "30%" }}
          exit={{ opacity: 0, height: "0" }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:hidden w-full fixed bottom-0 bg-white z-10 overflow-hidden shadow-2xl border rounded-t-3xl overflow-y-scroll gap-1"
        >
          <Heading size="4" className={mobileOption}>
            Heading
          </Heading>
          <Box className={mobileOption}>
            <Heading size="4">Heading</Heading>
            <Text>with text</Text>
          </Box>
          <Heading className={classNames(mobileOption, "font-normal")}>
            Text
          </Heading>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
