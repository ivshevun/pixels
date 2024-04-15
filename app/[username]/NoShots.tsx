import { Flex, Heading, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Image, { StaticImageData } from "next/image";

export default function NoShots({
  imageSource,
  heading,
  message,
  isSmall = false,
}: {
  imageSource: StaticImageData;
  heading: string;
  message: string;
  isSmall?: boolean;
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
        className={classNames(
          " object-contain",
          isSmall
            ? "w-24 sm:w-28 md:w-36 lg:w-48"
            : "w-64 sm:w-72 md:w-[450px] lg:w-[510px]"
        )}
        priority
      />
      <Heading
        as="h3"
        className={classNames(
          isSmall
            ? "text-lg sm:text-xl font-medium"
            : "text-xl sm:text-2xl md:text-3xl font-bold"
        )}
      >
        {heading}
      </Heading>
      <Text
        className={classNames(
          "text-center text-sm font-normal text-[#6e6d7a] leading-normal",
          isSmall ? "max-w-[400px]" : "sm:text-base max-w-[600px]"
        )}
      >
        {message}
      </Text>
    </Flex>
  );
}
