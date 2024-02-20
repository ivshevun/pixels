import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
} from "react";
import Controller from "./Controller";
import { DisclosureProps } from "./Aside";
import { Box, Flex, Text } from "@radix-ui/themes";
import SmallText from "@/app/auth/components/SmallText";
import classNames from "classnames";
import Image from "next/image";
import TransparentButton from "@/app/[username]/components/TransparentButton";
import log from "@/lib/log";

interface VideoControllerProps extends DisclosureProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

interface FileInputProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  name: string;
  children: ReactNode;
}

export default function MediaController({
  file,
  setFile,
  isOpen,
  setOpen,
}: VideoControllerProps) {
  return (
    <Controller isOpen={isOpen} setOpen={setOpen} title="Media">
      {/* Aside content */}
      <MediaContent file={file} setFile={setFile} className="p-4" />

      {/* Mobile content */}
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="h-full"
      >
        <MediaContent file={file} setFile={setFile} className="px-32 py-8" />
      </Flex>
    </Controller>
  );
}

const MediaContent = ({
  className,
  file,
  setFile,
}: {
  className?: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}) => {
  if (!file)
    return (
      <FileInput name="media" setFile={setFile} file={file}>
        <Flex
          direction="column"
          justify="center"
          align="center"
          className={classNames(
            "border rounded-xl gap-1 cursor-pointer",
            className
          )}
        >
          <Text className="px-12 py-2 border text-center text-sm rounded-full cursor-pointer">
            Select Media
          </Text>
          <Text className="text-xs text-center text-gray-400">
            or drop media to upload
          </Text>
        </Flex>
      </FileInput>
    );

  return (
    <Fragment>
      <Box className="w-3/4 h-3/4 rounded-xl border border-gray-200 p-4">
        <Box className="w-full h-full relative">
          <Image
            className="object-cover"
            src={URL.createObjectURL(file)}
            alt="Shot media"
            fill
          />
        </Box>
      </Box>
      <Flex gap="6" className="py-4 w-3/4">
        <FileInput
          file={file}
          setFile={setFile}
          name="image"
          className="w-1/2 cursor-pointer"
        >
          <TransparentButton className="w-full py-2 border-gray-300 pointer-events-none">
            Change
          </TransparentButton>
        </FileInput>
        <TransparentButton
          className="py-2 w-1/2 border-gray-300"
          onClick={() => setFile(null)}
        >
          Remove
        </TransparentButton>
      </Flex>
    </Fragment>
  );
};

const FileInput = ({
  file,
  setFile,
  name,
  children,
  ...props
}: FileInputProps) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const currentFile = event.target.files[0];

    setFile(currentFile);

    log("File during uploading", currentFile);
  };

  return (
    <label htmlFor={name} {...props}>
      {children}
      <input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
};
