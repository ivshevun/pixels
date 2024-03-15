"use client";
import log from "@/lib/log";
import {
  setEditorOpen,
  setMediaControllerOpen as setMediaOpen,
} from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { changeFileUrl } from "@/lib/redux/features/shotInfo/shotSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import ControlButtons from "./components/ControlButtons";
import ImagePlaceholder from "./components/ImagePlaceholder";
import ShotMedia from "./components/ShotMedia";
import ShotName from "./components/ShotName";
import TextEditor from "./components/TextEditor";
import MediaController from "./components/controllers/MediaController";
import handleFileChange from "./utils/handleFileChange";

export default function UploadPage() {
  const dispatch = useAppDispatch();
  const { isEditorOpen, isMediaControllerOpen: isMediaOpen } = useDisclosure();

  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const disclosures = [isEditorOpen, isMediaOpen];
  const areDisclosuresOpen = disclosures.some((disclosure) => disclosure);

  const isAside = areDisclosuresOpen && window.innerWidth > 1024;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEscapeKey = event.key === "Escape";

    if (isEscapeKey && !areDisclosuresOpen) {
      // if no file is uploaded, go back
      if (!file) router.back();
    }

    if (isEscapeKey && isEditorOpen) {
      dispatch(setEditorOpen(false));
    }

    if (isEscapeKey && isMediaOpen) {
      dispatch(setMediaOpen(false));
    }
  };

  const handleClick = () => {
    if (isMediaOpen) dispatch(setMediaOpen(false));
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

  const onSubmit = async () => {
    // open final touches modal
    // const imageUrl = await uploadImage();
  };

  return (
    <motion.div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={classNames(
        "flex flex-col h-screen overflow-x-hidden xs:pb-16",
        !file && "overflow-y-hidden"
      )}
    >
      <Flex className="relative w-full">
        <motion.div
          className="flex flex-col justify-center items-center text-center px-4"
          onClick={handleClick}
          initial={{
            width: isAside ? "80%" : "100%",
          }}
          animate={{
            width: isAside ? "80%" : "100%",
          }}
          transition={{ duration: 0.3 }}
        >
          <ControlButtons file={file} onSubmit={onSubmit} />
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
              onChange={(event) => handleFileChange(event, setFile, dispatch)}
            />
          )}
          {/* Editor */}
          {file && <TextEditor />}
        </motion.div>
        <MediaController file={file} setFile={setFile} />
      </Flex>
    </motion.div>
  );
}
