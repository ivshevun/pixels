import Image from "next/image";
import { Flex, Text } from "@radix-ui/themes";
import MediaFeatures from "./MediaFeatures";
import SmallText from "@/app/auth/components/SmallText";

export default function ImagePlaceholder() {
  return (
    <label
      htmlFor="file"
      className="flex flex-col justify-center items-center rounded-xl w-full lg:w-3/4 xl:w-3/5 h-full md:h-[700px] gap-12 cursor-pointer relative overflow-hidden border-2 border-dashed py-4"
    >
      <Flex direction="column" gap="2" align="center" className="mt-2">
        <Image
          src="/assets/image-placeholder.png"
          alt=""
          width="85"
          height="92"
          className="hidden sm:block"
        />
        <Text>
          Drag and drop an image, or{" "}
          <span className="pb-1 border-b-2 border-purple-500">Browse</span>
        </Text>
        <SmallText>Minimum 1600px width recommended.</SmallText>
      </Flex>
      <MediaFeatures />
    </label>
  );
}