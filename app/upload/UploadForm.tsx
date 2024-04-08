"use client";
import log from "@/lib/log";
import {
  setEditorOpen,
  setMediaControllerOpen as setMediaOpen,
} from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import {
  changeDescription,
  changeFileUrl,
  changeTags,
  changeTitle,
} from "@/lib/redux/features/shotCreation/shotCreationSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Shot } from "@prisma/client";
import { Flex, Heading } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useShotImage from "../hooks/useShotImage";
import ControlButtons from "./components/ControlButtons";
import ImagePlaceholder from "./components/ImagePlaceholder";
import ShotMedia from "./components/ShotMedia";
import ShotName from "./components/ShotName";
import TextEditor from "./components/TextEditor";
import MediaController from "./components/controllers/MediaController";
import handleFileChange from "./utils/handleFileChange";

export default function UploadForm({ shot }: { shot?: Shot }) {
  const dispatch = useAppDispatch();
  const { isEditorOpen, isMediaControllerOpen: isMediaOpen } = useDisclosure();
  const shotInfo = useShotCreationInfo();

  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  const session = useSession();

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
      const { data }: AxiosResponse<{ response: string }> = await axios.post(
        "/api/upload",
        formData
      );

      log("Image uploaded successfully", data);

      return data.response;
    } catch (error) {
      // Handle error
      log(error);
    }
  };

  const onSubmit = async () => {
    let imageUrl: string | undefined = "";

    if (shotInfo.fileUrl !== shot?.imageUrl || !shot) {
      imageUrl = await uploadImage();
    } else imageUrl = shot.imageUrl;

    const shotData = {
      title: shotInfo.shotTitle,
      description: shotInfo.shotDescription,
      tags: shotInfo.tags,
      imageUrl: imageUrl!,
      userId: session.data?.user.id!,
      shotId: shot?.id || undefined,
    };
    try {
      // If no initial shot. It means that it checks if we are on the /upload or on the /edit.
      if (!shot) {
        const { data, status }: AxiosResponse<Shot> = await axios.post(
          "/api/shot",
          shotData
        );

        log("shot created", data);

        if (status > 200) {
          throw new Error("Something went wrong");
        }
      }

      const { data, status } = await axios.patch("/api/shot", shotData);

      log("shot updated", data);

      if (status > 200) {
        throw new Error("Something went wrong");
      }

      // reset shot info
      dispatch(changeTitle(""));
      dispatch(changeDescription(""));
      dispatch(changeTags([]));

      // return to profile page
      router.push("/" + session.data?.user.username);

      // show success toast
      toast.success(`Shot ${shot ? "updated" : "created"}`, { duration: 3000 });
    } catch (error) {
      // show error to user and redirect him to the profile page
      router.push("/" + session.data?.user.username);
      toast.error("Something went wrong", { duration: 3000 });

      log(error);
    }
  };

  const changeUrl = (url: string) => {
    dispatch(changeFileUrl(url));
  };

  const {
    data: fetchedFile,
    isLoading,
    isError,
    error,
  } = useShotImage(shot?.imageUrl);

  // set the file if it exists
  useEffect(() => {
    fetchedFile && setFile(fetchedFile);
  }, [fetchedFile]);

  useEffect(() => {
    if (shot) {
      dispatch(changeTitle(shot.title));
      dispatch(changeDescription(shot.description));
      dispatch(changeFileUrl(shot.imageUrl));
      dispatch(changeTags(shot.tags));
    }
  }, [dispatch, shot]);

  if (isError) toast.error(error.message);

  const areButtonsDisabled = isLoading || isError;

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
          <ControlButtons
            disabled={areButtonsDisabled}
            file={file}
            onSubmit={onSubmit}
          />
          {file ? (
            <ShotName />
          ) : (
            <Heading className="text-3xl md:text-4xl mb-16">
              What have you been working on?
            </Heading>
          )}

          {/* Conditional rendering because of how AnimatePresence works */}
          <AnimatePresence>
            {file && <ShotMedia setFile={setFile} file={file} />}
          </AnimatePresence>
          {!file && <ImagePlaceholder isLoading={isLoading} />}
          {!file && (
            <input
              accept="image/*"
              className="hidden"
              name="file"
              type="file"
              id="file"
              onChange={(event) => handleFileChange(event, setFile, changeUrl)}
            />
          )}
          {/* Editor */}
          {file && <TextEditor />}
        </motion.div>
        <MediaController shot={shot} file={file} setFile={setFile} />
      </Flex>
    </motion.div>
  );
}
