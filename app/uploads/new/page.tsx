"use client";
import TransparentButton from "@/app/[username]/components/TransparentButton";
import SmallText from "@/app/auth/components/SmallText";
import DarkButton from "@/app/components/DarkButton";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BeigeButton from "./components/BeigeButton";
import MediaFeatures from "./components/MediaFeatures";

export default function UploadPage() {
  return (
    <Flex direction="column" className="overflow-hidden max-h-screen">
      <ControlButtons />
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="text-center py-8 px-4 gap-16"
      >
        <Heading className="text-3xl md:text-4xl">
          What have you been working on?
        </Heading>
        <ImagePlaceholder />
        <input
          accept="image/*, video/*"
          className="hidden"
          name="file"
          type="file"
          id="file"
        />
        {/* Editor */}
      </Flex>
    </Flex>
  );
}

const ControlButtons = () => {
  const router = useRouter();
  const { data } = useSession();

  return (
    <Flex
      width="100%"
      justify="between"
      className="p-6 gap-4 xs:gap-24 sm:gap-4"
    >
      <TransparentButton
        onClick={() => router.push(`/${data?.user?.username}`)}
        className="px-4"
      >
        Cancel
      </TransparentButton>

      <Flex
        gap="4"
        align="center"
        justify="end"
        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/6"
      >
        {/* Make it disabled if no image is provided */}
        <BeigeButton className="w-full">
          {/* Mobile text */}
          <Text className="sm:hidden">Save</Text>

          {/* Desktop text */}
          <Text className="hidden sm:block">Save as draft</Text>
        </BeigeButton>
        <DarkButton className="text-sm font-semibold py-2">Continue</DarkButton>
      </Flex>
    </Flex>
  );
};

const ImagePlaceholder = () => {
  return (
    <label
      htmlFor="file"
      className="flex flex-col justify-center items-center border-2 border-dashed rounded-xl py-12 md:py-0 lg:py-0 w-full lg:w-3/4 xl:w-3/5 md:h-[700px] gap-12 cursor-pointer "
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
};
