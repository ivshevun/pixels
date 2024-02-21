"use client";
import log from "@/lib/log";
import { Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import BlockInserter from "./components/BlockInserter";
import ControlButtons from "./components/ControlButtons";
import EditorController from "./components/EditorController";
import ImagePlaceholder from "./components/ImagePlaceholder";
import MediaController from "./components/MediaController";
import ShotMedia from "./components/ShotMedia";
import BlockController from "./components/BlockController";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [isMediaOpen, setMediaOpen] = useState(false);
  const [isBlockOpen, setBlockOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const isMobile =
    (isEditorOpen && window.innerWidth < 1024) ||
    (isMediaOpen && window.innerWidth < 1024);
  const isAside =
    (isEditorOpen && window.innerWidth > 1024) ||
    (isMediaOpen && window.innerWidth > 1024);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEnterKey = event.key === "Enter";
    const isEscapeKey = event.key === "Escape";

    if (isEnterKey && file) {
      uploadImage();
    }

    if (isEscapeKey && !isEditorOpen && !isMediaOpen && !isBlockOpen) {
      if (file) setFile(null);
      // if no file is uploaded, go back
      else router.push("/" + session?.user.username);
    }

    if (isEscapeKey && isEditorOpen) {
      setEditorOpen(false);
    }

    if (isEscapeKey && isMediaOpen) {
      setMediaOpen(false);
    }

    if (isEscapeKey && isBlockOpen) {
      setBlockOpen(false);
    }
  };

  const handleClick = () => {
    if (isEditorOpen) setEditorOpen(false);
    if (isMediaOpen) setMediaOpen(false);
    if (isBlockOpen) setBlockOpen(false);
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
          <Heading className="text-3xl md:text-4xl ">
            What have you been working on?
          </Heading>
          {/* Conditional rendering because of how AnimatePresence works */}
          <AnimatePresence>
            {file && (
              <ShotMedia
                isMediaOpen={isMediaOpen}
                setMediaOpen={setMediaOpen}
                setFile={setFile}
                file={file}
              />
            )}
          </AnimatePresence>
          {!file && <ImagePlaceholder />}
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
          <BlockInserter
            isMobile={isMobile}
            setOpen={setBlockOpen}
            file={file}
          />
          {/* Editor */}
        </motion.div>
        <EditorController isOpen={isEditorOpen} setOpen={setEditorOpen} />
        <MediaController
          file={file}
          setFile={setFile}
          isOpen={isMediaOpen}
          setOpen={setMediaOpen}
        />
        <BlockController isOpen={isBlockOpen} setOpen={setBlockOpen} />
      </Flex>
    </motion.div>
  );
}
