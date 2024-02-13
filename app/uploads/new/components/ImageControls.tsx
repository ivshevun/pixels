import { Flex, Separator } from "@radix-ui/themes";
import { FaArrowDown, FaArrowUp, FaRegTrashCan } from "react-icons/fa6";
import { HiOutlineDuplicate } from "react-icons/hi";

export default function ImageControls({
  handleDelete,
}: {
  handleDelete: () => void;
}) {
  return (
    <button className="flex-col justify-center items-center border py-4 px-3 bg-white rounded-full shadow-xl absolute -right-14 top-10 h-auto gap-3 text-black active:bg-white hidden lg:flex">
      <Flex direction="column" className="*:cursor-pointer" gap="2">
        <FaArrowUp size="14" className="text-gray-300" />
        <FaArrowDown size="14" />
      </Flex>
      <Separator />

      <HiOutlineDuplicate size="14" className="text-black cursor-pointer" />
      <Separator />

      <FaRegTrashCan
        onClick={handleDelete}
        className="text-red-500 cursor-pointer"
        size="14"
      />
    </button>
  );
}
