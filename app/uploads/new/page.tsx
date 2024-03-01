"use client";
import log from "@/lib/log";
import {
  setBlockInserterOpen as setBlockOpen,
  setEditorOpen,
  setMediaControllerOpen as setMediaOpen,
} from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import BlockInserter from "./components/BlockInserter";
import ControlButtons from "./components/ControlButtons";
import ImagePlaceholder from "./components/ImagePlaceholder";
import ShotMedia from "./components/ShotMedia";
import ShotName from "./components/ShotName";
import TextEditor from "./components/TextEditor";
import BlockController from "./components/controllers/BlockController";
import EditorController from "./components/controllers/EditorController";
import MediaController from "./components/controllers/MediaController";

export default function UploadPage() {
  const dispatch = useAppDispatch();
  const {
    isEditorOpen,
    isMediaControllerOpen: isMediaOpen,
    isBlockInserterOpen: isBlockOpen,
  } = useDisclosure();

  const [file, setFile] = useState<File | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  const disclosures = [isEditorOpen, isMediaOpen, isBlockOpen];
  const areDisclosuresOpen = disclosures.some((disclosure) => disclosure);

  const isMobile = areDisclosuresOpen && window.innerWidth < 1024;
  const isAside = areDisclosuresOpen && window.innerWidth > 1024;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEnterKey = event.key === "Enter";
    const isEscapeKey = event.key === "Escape";

    // if (isEnterKey && file && !isEditorOpen) {
    //   uploadImage();
    // }

    if (isEscapeKey && !areDisclosuresOpen) {
      if (file) setFile(null);
      // if no file is uploaded, go back
      else router.push("/" + session?.user.username);
    }

    if (isEscapeKey && isEditorOpen) {
      dispatch(setEditorOpen(false));
    }

    if (isEscapeKey && isMediaOpen) {
      dispatch(setMediaOpen(false));
    }

    if (isEscapeKey && isBlockOpen) {
      dispatch(setBlockOpen(false));
    }
  };

  const handleClick = () => {
    if (isMediaOpen) dispatch(setMediaOpen(false));
    if (isBlockOpen) dispatch(setBlockOpen(false));
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
    <motion.div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={classNames(
        "flex flex-col h-screen overflow-x-hidden",
        !file && "overflow-y-hidden"
      )}
    >
      <Flex className="relative w-full">
        <motion.div
          className="flex flex-col justify-center items-center text-center px-4 gap-16"
          onClick={handleClick}
          initial={{
            width: isAside ? "80%" : "100%",
          }}
          animate={{
            width: isAside ? "80%" : "100%",
          }}
          transition={{ duration: 0.3 }}
        >
          <ControlButtons file={file} onSubmit={uploadImage} />
          <ShotName file={file} />
          {/* Conditional rendering because of how AnimatePresence works */}
          <AnimatePresence>
            {file && <ShotMedia setFile={setFile} file={file} />}
          </AnimatePresence>
          {!file && <ImagePlaceholder />}
          {!file && (
            <input
              accept="image/*"
              className="hidden"
              name="file"
              type="file"
              id="file"
              onChange={handleFileChange}
            />
          )}
          {/* Editor */}
          {file && <TextEditor />}
          <BlockInserter isMobile={isMobile} file={file} />
        </motion.div>
        <EditorController />
        <MediaController file={file} setFile={setFile} />
        <BlockController />
      </Flex>
    </motion.div>
  );
}
