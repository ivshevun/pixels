import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Authorization from "./Authorization";

export default function page() {
  return (
    <Flex justify="between" gap="9" className="h-screen">
      <video
        autoPlay
        playsInline
        loop
        muted
        className="h-screen w-[500px] object-cover hidden lg:block"
        src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
      />
      <Authorization />
    </Flex>
  );
}

export const metadata: Metadata = {
  title: "Sign In | Pixels",
};
