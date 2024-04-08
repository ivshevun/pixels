"use client";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import DeleteModal from "./DeleteModal";

export default function ShotEditing({ shotId }: { shotId: string }) {
  return (
    <Flex
      justify="center"
      align="center"
      gap="6"
      className="text-sm text-zinc-400 text-$[#3d3d4e] font-normal"
    >
      <Link href={`/edit?shotId=${shotId}`}>Edit</Link>
      <DeleteModal shotId={shotId} />
    </Flex>
  );
}
