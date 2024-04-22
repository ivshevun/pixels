"use client";
import { Button, Heading, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { GoArrowLeft } from "react-icons/go";

export default function NotFoundText() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true });

  return (
    <div
      className={classNames(
        "flex flex-col justify-center items-center border flex-1 h-screen gap-4 px-6 lg:px-0",
        isInView ? "opacity-1 -translate-y-6" : "opacity-0 translate-y-0"
      )}
      ref={textRef}
      style={{
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
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
    </div>
  );
}
