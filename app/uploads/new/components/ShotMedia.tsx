import { opacityVariants } from "@/lib/animationVariants";
import { setMediaControllerOpen as setMediaOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import ImageControls from "./ImageControls";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";

export default function ShotMedia({
  file,
  setFile,
}: {
  file: File;
  setFile: Dispatch<SetStateAction<File | null>>;
}) {
  const dispatch = useAppDispatch();
  const { isMediaControllerOpen: isMediaOpen } = useDisclosure();
  const { fileUrl } = useShotCreationInfo();

  return (
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
      {fileUrl && (
        <Image
          className="w-full h-full object-cover rounded-lg "
          src={fileUrl}
          alt="Shot Image"
          width="1280"
          height="1600"
          onClick={() => {
            // open only on mobile
            if (window.innerWidth < 1024) dispatch(setMediaOpen(!isMediaOpen));
          }}
        />
      )}
      <ImageControls file={file} setFile={setFile} />
    </motion.div>
  );
}
