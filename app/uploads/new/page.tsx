"use client";
import TransparentButton from "@/app/[username]/components/TransparentButton";
import SmallText from "@/app/auth/components/SmallText";
import DarkButton from "@/app/components/DarkButton";
import { opacityVariants } from "@/lib/animationVariants";
import log from "@/lib/log";
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import { FaPlus } from "react-icons/fa6";
import Aside from "./components/Aside";
import BeigeButton from "./components/BeigeButton";
import ImageControls from "./components/ImageControls";
import MediaFeatures from "./components/MediaFeatures";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAsideOpen, setAsideOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEnterKey = event.key === "Enter";
    const isEscapeKey = event.key === "Escape";

    if (isEnterKey && file) {
      uploadImage();
    }

    if (isEscapeKey && !isAsideOpen) {
      if (file) setFile(null);
      // if no file is uploaded, go back
      else router.push("/" + session?.user.username);
    }

    if (isEscapeKey && isAsideOpen) {
      setAsideOpen(false);
    }
  };

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
    <Flex
      onKeyDown={handleKeyDown}
      tabIndex={0}
      direction="column"
      className={classNames(
        "h-screen overflow-x-hidden",
        !file && "overflow-y-hidden"
      )}
    >
      <Flex className="relative w-full">
        <motion.div
          className="flex flex-col justify-center items-center text-center px-4 gap-16"
          initial={{ width: isAsideOpen ? "80%" : "100%" }}
          animate={{ width: isAsideOpen ? "80%" : "100%" }}
          transition={{ duration: 0.3 }}
        >
          <ControlButtons file={file} onSubmit={uploadImage} />
          <Heading className="text-3xl md:text-4xl ">
            What have you been working on?
          </Heading>
          {/* Conditional rendering because of how AnimatePresence works */}
          <AnimatePresence>
            {file && <ShotMedia setFile={setFile} file={file} />}
          </AnimatePresence>
          {!file && <ImagePlaceholder file={file} />}
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
          <BlockInserter setOpen={setAsideOpen} file={file} />
          {/* Editor */}
        </motion.div>
        <Aside isOpen={isAsideOpen} setOpen={setAsideOpen} />
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
  const { data: session } = useSession();

  return (
    <Flex
      width="100%"
      justify="between"
      className="p-6 gap-4 xs:gap-24 sm:gap-4"
    >
      <TransparentButton
        onClick={() => router.push(`/${session?.user?.username}`)}
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
      className="flex flex-col justify-center items-center rounded-xl w-full lg:w-3/4 xl:w-3/5 h-full md:h-[700px] gap-12 cursor-pointer relative overflow-hidden border-2 border-dashed"
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

const ShotMedia = ({
  file,
  setFile,
}: {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}) => {
  return (
    file && (
      <motion.div
        key={file.name}
        variants={opacityVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="relative w-full lg:w-3/4 p-4 border-2 border-transparent hover:border-2 hover:border-gray-200 rounded-lg transition-all duration-200 "
      >
        <Image
          className="w-full h-full object-cover rounded-lg "
          src={URL.createObjectURL(file)}
          alt="Shot Image"
          width="1280"
          height="1600"
          autoFocus
        />
        <ImageControls handleDelete={() => setFile(null)} />
      </motion.div>
    )
  );
};

const BlockInserter = ({
  setOpen,
  file,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  file: File | null;
}) => {
  return (
    file && (
      <Flex
        width="100%"
        justify="between"
        className="w-screen overflow-hidden"
        align="center"
      >
        <Separator className="flex-1" />
        <TransparentButton
          className="px-24 py-4 flex items-center gap-2 font-normal"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <FaPlus />
          <Text>Insert Block</Text>
        </TransparentButton>
        <Separator className="flex-1" />
      </Flex>
    )
  );
};
