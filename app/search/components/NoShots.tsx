"use client";
import { Flex, Heading, Text } from "@radix-ui/themes";

export const NoShots = () => {
  return (
    <Flex direction="column" align="center" className="py-48" gap="4">
      <iframe src="https://lottie.host/embed/bbefdd99-048c-4108-a591-31c71d561de0/njUqpPgHTp.lottie" />
      <Flex direction="column" align="center" gap="4">
        <Heading className="text-center text-3xl xs:text-4xl sm:text-5xl md:text-7xl">
          No results <span className="text-purple-500">yet</span> :(
        </Heading>
        <Text className="w-3/4 text-center">
          {" "}
          We`ve searched far and wide, but haven`t found anything.
        </Text>
      </Flex>
    </Flex>
  );
};
