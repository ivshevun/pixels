import { opacityVariants } from "@/lib/animationVariants";
import classNames from "classnames";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import ImageControls from "./ImageControls";
import Image from "next/image";

export default function ShotMedia({
  file,
  isMediaOpen,
  setMediaOpen,
  setFile,
}: {
  file: File | null;
  isMediaOpen: boolean;
  setMediaOpen: Dispatch<SetStateAction<boolean>>;
  setFile: Dispatch<SetStateAction<File | null>>;
}) {
  return (
    file && (
      <motion.div
        key={file.name}
        variants={opacityVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={classNames(
          "relative w-full lg:w-3/4 p-4 border-2 hover:border-2 hover:border-gray-200 rounded-lg transition-all duration-200",
          isMediaOpen && "border-purple-500 hover:border-purple-500"
        )}
      >
        <Image
          className="w-full h-full object-cover rounded-lg "
          src={URL.createObjectURL(file)}
          alt="Shot Image"
          width="1280"
          height="1600"
          onClick={() => {
            // open only on mobile
            if (window.innerWidth < 1024) setMediaOpen((prevOpen) => !prevOpen);
          }}
          autoFocus
        />
        <ImageControls handleDelete={() => setFile(null)} />
      </motion.div>
    )
  );
}
