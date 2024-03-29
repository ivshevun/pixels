"use client";
import errorImage from "@/public/assets/404.jpg";
import { Button, Flex, Heading, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.svg";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      align="center"
      className="w-full h-screen border relative py-48 gap-4"
    >
      <Image
        src={logo}
        alt="Pixels"
        className="absolute top-0 left-0 w-36 opacity-50"
      />
      <Image src={errorImage} alt="404" />
      <Heading className="text-4xl md:text-6xl">Oooops!</Heading>
      <Text className="text-2xl md:text-3xl font-bold text-center">
        Looks like you are in the wrong place
      </Text>
      <Button
        color="purple"
        size={{ initial: "3", md: "4" }}
        onClick={() => router.push("/")}
        className="cursor-pointer"
      >
        Take me home
      </Button>
      <Text className="absolute bottom-0 right-2 text-xs opacity-70 flex gap-2 items-center">
        Yeah, I totally stole it from
        <Link className="text-purple-500" href="https://batch.com/">
          Batch
        </Link>
      </Text>
    </Flex>
  );
}
