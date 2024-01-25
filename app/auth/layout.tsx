import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <Flex justify="between" gap="9" className="h-screen">
      <video
        autoPlay
        playsInline
        loop
        muted
        className="h-screen w-[400px] object-cover hidden lg:block"
        src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
      />
      {children}
    </Flex>
  );
}
