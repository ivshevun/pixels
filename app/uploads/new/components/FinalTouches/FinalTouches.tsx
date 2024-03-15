import TransparentButton from "@/app/[username]/components/TransparentButton";
import DarkButton from "@/app/components/DarkButton";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { Dialog, Flex, Text, Tooltip } from "@radix-ui/themes";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import ComboOptions from "./ComboOptions";
import Tags from "./Tags";
import React from "react";

export default function FinalTouches({ onSubmit }: { onSubmit: () => void }) {
  const { fileUrl, shotTitle } = useShotInfo();

  // remove html tags
  const title = shotTitle.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <DarkButton
          onClick={() => onSubmit()}
          className="text-sm font-semibold py-2 disabled:text-gray-300"
          disabled={!fileUrl || !title}
        >
          Continue
        </DarkButton>
      </Dialog.Trigger>
      {fileUrl && (
        <Dialog.Content className="max-w-4xl px-0 md:px-12 flex flex-col items-center md:items-start overflow-visible">
          <Dialog.Title className="text-center md:text-left ">
            Final Touches
          </Dialog.Title>

          <Flex className="gap-16 flex-col items-center w-3/4 md:w-full md:flex-row">
            <Flex direction="column" gap="1" className="w-full md:w-1/3">
              <Text className="text-sm md:text-base text-center md:text-left whitespace-nowrap">
                Thumbnail preview
              </Text>
              <div className="h-48 max-w-[34.5rem] w-full relative">
                <Image
                  src={fileUrl}
                  alt="Shot Thumbnail"
                  className="rounded-lg object-cover w-auto h-auto"
                  fill
                />
              </div>
              <ShotStats />
            </Flex>
            <Flex direction="column" className="w-3/4 md:w-1/2">
              <ComboBox />
              <Buttons />
            </Flex>
          </Flex>
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
}

const ShotStats = () => {
  return (
    <Flex
      gap="3"
      align="center"
      className="text-xs text-gray-500 mt-1 justify-center md:justify-end"
    >
      <Flex align="center" gap="1">
        <FaHeart size="14" />
        54
      </Flex>
      <Flex align="center" gap="1">
        <FaEye size="16" />
        1029
      </Flex>
    </Flex>
  );
};

const ComboBox = () => {
  return (
    <Flex direction="column" gap="1" className="relative overflow-visible ">
      <label className="text-base">
        Tags <span className="text-xs font-light">(maximum 20)</span>
      </label>
      <Tags />
      <ComboOptions />
    </Flex>
  );
};

const Buttons = () => {
  return (
    <Flex className="mt-36 gap-4 md:gap-0 justify-center md:justify-between">
      <Dialog.Close>
        <TransparentButton className="py-2 px-4">Cancel</TransparentButton>
      </Dialog.Close>
      <DarkButton className="py-2 text-base">Continue</DarkButton>
    </Flex>
  );
};
