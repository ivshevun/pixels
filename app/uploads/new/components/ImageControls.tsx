import { Separator } from "@radix-ui/themes";
import { Dispatch, SetStateAction } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FileInput } from "./controllers/MediaController";

export default function ImageControls({
  file,
  setFile,
}: {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}) {
  return (
    <button className="flex-col justify-center items-center border py-4 px-3 bg-white rounded-full shadow-xl absolute -right-14 top-10 h-auto gap-3 text-black active:bg-white hidden lg:flex">
      {/* <Flex direction="column" className="*:cursor-pointer" gap="2">
        <FaArrowUp size="14" className="text-gray-300" />
        <FaArrowDown size="14" />
      </Flex>
      <Separator /> */}

      <FileInput name="image-swapper" file={file} setFile={setFile}>
        <FaExchangeAlt size="14" className="text-black cursor-pointer" />
      </FileInput>
      <Separator />

      <FaRegTrashCan
        onClick={() => setFile(null)}
        className="text-red-500 cursor-pointer"
        size="14"
      />
    </button>
  );
}
