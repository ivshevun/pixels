import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export default function NotFoundPage() {
  return (
    <Flex className="w-full h-screen justify-between overflow-hidden">
      <Flex
        direction="column"
        className="justify-center items-center border flex-1 h-screen gap-4 px-6 lg:px-0"
      >
        <Text className="text-zinc-300 text-sm">404 error</Text>
        <Heading className="text-3xl sm:text-4xl md:text-5xl 2xl:text-7xl w-full lg:w-3/4 xl:w-1/2 text-center">
          Something`s missing
        </Heading>
        <Text className="w-full lg:w-1/2 xl:w-1/3 text-center">
          You are seeing this page because the URL you entered doesn`t exist.
        </Text>
        <Link href="/">
          <Button
            size="4"
            radius="full"
            color="purple"
            className="cursor-pointer"
          >
            <GoArrowLeft />
            Back to home
          </Button>
        </Link>
      </Flex>
      <video
        className="object-cover hidden xl:block"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/assets/404.mp4" type="video/mp4" />
      </video>
    </Flex>
  );
}
