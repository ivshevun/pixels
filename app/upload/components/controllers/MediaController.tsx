import TransparentButton from "@/app/components/Buttons/TransparentButton";
import log from "@/lib/log";
import { setMediaControllerOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Box, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Image from "next/image";
import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
} from "react";
import Controller from "./Controller";
import handleFileChange from "../../utils/handleFileChange";
import { changeFileUrl } from "@/lib/redux/features/shotCreation/shotCreationSlice";
import { Shot } from "@prisma/client";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import { usePathname } from "next/navigation";

interface VideoControllerProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  shot?: Shot;
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
  shot,
}: VideoControllerProps) {
  const dispatch = useAppDispatch();
  const { isMediaControllerOpen: isMediaOpen } = useDisclosure();

  return (
    <Controller
      isOpen={isMediaOpen}
      setOpen={(isOpen: boolean) => dispatch(setMediaControllerOpen(isOpen))}
      title="Media"
    >
      {/* Aside content */}
      <MediaContent shot={shot} file={file} setFile={setFile} className="p-4" />

      {/* Mobile content */}
      <Flex
        direction="column"
        justify="center"
        align="center"
        className="h-full"
      >
        <MediaContent
          shot={shot}
          file={file}
          setFile={setFile}
          className="px-32 py-8"
        />
      </Flex>
    </Controller>
  );
}

const MediaContent = ({
  className,
  file,
  setFile,
  shot,
}: {
  className?: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  shot?: Shot;
}) => {
  const shotInfo = useShotCreationInfo();
  const pathName = usePathname();

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

  const imageUrl =
    shot?.imageUrl === shotInfo.fileUrl && shot
      ? shot?.imageUrl
      : URL.createObjectURL(file);

  const isEditing = pathName === "/edit";

  return (
    <Fragment>
      <Box className="w-3/4 h-3/4 rounded-xl border border-gray-200 p-4">
        <Box className="w-full h-full relative">
          <Image
            className="object-cover"
            src={imageUrl}
            alt="Shot media"
            fill
          />
        </Box>
      </Box>
      <Flex
        gap="6"
        className={classNames(
          "py-4",
          isEditing ? "w-full justify-center" : "w-3/4"
        )}
      >
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
        {!isEditing && (
          <TransparentButton
            className="py-2 w-1/2 border-gray-300"
            onClick={() => setFile(null)}
          >
            Remove
          </TransparentButton>
        )}
      </Flex>
    </Fragment>
  );
};

export const FileInput = ({
  file,
  setFile,
  name,
  children,
  ...props
}: Omit<FileInputProps, "shot">) => {
  const dispatch = useAppDispatch();

  const changeUrl = (url: string) => {
    dispatch(changeFileUrl(url));
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
        onChange={(event) => handleFileChange(event, setFile, changeUrl)}
      />
    </label>
  );
};
