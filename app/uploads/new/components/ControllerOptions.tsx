import { Box, Heading, Text } from "@radix-ui/themes";
import { Fragment, useState } from "react";
import Dropdown from "./Dropdown";

export const BlockOptions = ({ optionStyles }: { optionStyles: string }) => {
  return (
    <Fragment>
      <Heading size="4" className={optionStyles}>
        Heading
      </Heading>
      <Box className={optionStyles}>
        <Heading size="4">Heading</Heading>
        <Text>with text</Text>
      </Box>
      <Text className={optionStyles}>Text</Text>
    </Fragment>
  );
};

const selectItems = ["heading 1", "heading 2", "text"];

export const AsideContent = () => {
  const [currentFont, setCurrentFont] = useState("");

  return (
    <Dropdown
      options={selectItems}
      currentItem={currentFont}
      setCurrentItem={setCurrentFont}
    />
  );
};
