import { Flex, Heading, Text } from "@radix-ui/themes";
import Image, { StaticImageData } from "next/image";

export default function NoShots({
  imageSource,
  heading,
  message,
}: {
  imageSource: StaticImageData;
  heading: string;
  message: string;
}) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="py-4 gap-4"
    >
      <Image
        src={imageSource}
        alt="No shots"
        className="w-64 sm:w-72 md:w-[450px] lg:w-[510px] object-contain"
      />
      <Heading as="h3" className="text-xl sm:text-2xl md:text-3xl font-bold ">
        {heading}
      </Heading>
      <Text className="text-center text-sm font-normal sm:text-base text-[#6e6d7a] leading-normal max-w-[600px]">
        {message}
      </Text>
    </Flex>
  );
}
