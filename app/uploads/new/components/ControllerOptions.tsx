import { Box, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { Fragment } from "react";

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

export const AsideContent = ({}) => {
  return (
    <Flex direction="column">
      <Flex>
        <label>Select</label>
        <Select.Root>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="heading-1">Heading 1</Select.Item>
              <Select.Item value="heading-2">Heading 2</Select.Item>
              <Select.Item value="heading-3">Text</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Flex>
  );
};
