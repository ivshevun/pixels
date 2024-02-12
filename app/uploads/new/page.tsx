"use client";
import TransparentButton from "@/app/[username]/components/TransparentButton";
import SmallText from "@/app/auth/components/SmallText";
import DarkButton from "@/app/components/DarkButton";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, KeyboardEvent, useState } from "react";
import BeigeButton from "./components/BeigeButton";
import MediaFeatures from "./components/MediaFeatures";
import log from "@/lib/log";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const currentFile = event.target.files[0];

    setFile(currentFile);

    log("File during uploading", currentFile);
  };

  const uploadImage = async () => {
    // Check if there is a file
    if (!file) return;

    // Create a form data object
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make a request for uploading the image
      const { data } = await axios.post("/api/upload", formData);

      log("Image uploaded successfully", data);

      //TODO: Make some toast to show that the image was uploaded and enhance UX
    } catch (error) {
      // Handle error
      log(error);
    }
  };

  return (
    <Flex direction="column" className="overflow-hidden max-h-screen">
      <ControlButtons file={file} onSubmit={uploadImage} />
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="text-center py-8 px-4 gap-16"
      >
        <Heading className="text-3xl md:text-4xl">
          What have you been working on?
        </Heading>

        {/* Show here an image if there is */}
        <ImagePlaceholder file={file} />
        {!file && (
          <input
            accept="image/*, video/*"
            className="hidden"
            name="file"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        )}
        {/* Editor */}
      </Flex>
    </Flex>
  );
}

const ControlButtons = ({
  onSubmit,
  file,
}: {
  onSubmit: () => void;
  file: File | null;
}) => {
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
        <BeigeButton className="w-full" disabled={!file}>
          {/* Mobile text */}
          <Text className="sm:hidden">Save</Text>

          {/* Desktop text */}
          <Text className="hidden sm:block">Save as draft</Text>
        </BeigeButton>
        <DarkButton
          onClick={() => onSubmit()}
          className="text-sm font-semibold py-2"
          disabled={!file}
        >
          Continue
        </DarkButton>
      </Flex>
    </Flex>
  );
};

const ImagePlaceholder = ({ file }: { file: File | null }) => {
  return (
    <label
      htmlFor="file"
      className={classNames(
        "flex flex-col justify-center items-center rounded-xl py-12 md:py-0 lg:py-0 w-full lg:w-3/4 xl:w-3/5 md:h-[700px] gap-12 cursor-pointer relative",
        !file && "border-2 border-dashed"
      )}
    >
      {/* Show image or imagePlaceholder */}
      {file ? (
        <Image
          className="w-full h-full object-cover rounded-lg border-2 border-transparent hover:border-2 hover:border-gray-200 transition-all duration-200 p-4 relative"
          src={URL.createObjectURL(file)}
          alt="Shot Image"
          fill
        />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </label>
  );
};
