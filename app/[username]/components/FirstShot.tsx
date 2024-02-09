"use client";
import DarkButton from "@/app/components/DarkButton";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FaPencilRuler } from "react-icons/fa";

export default function FirstShot() {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className="border-2 border-dashed rounded-lg max-w-[500px] px-12 py-16 text-center"
      gap="4"
    >
      <FaPencilRuler size="48" className="text-indigo-900 hidden lg:block" />
      <Heading className="text-2xl">Upload your first shot</Heading>
      <Text className="text-base font-normal">
        Show off your best work. Get feedback, likes and be a part of a growing
        community.
      </Text>
      <DarkButton
        onClick={() => router.push("/uploads/new")}
        className="sm:w-1/2 text-sm py-4"
      >
        Upload your first shot
      </DarkButton>
    </Flex>
  );
}
