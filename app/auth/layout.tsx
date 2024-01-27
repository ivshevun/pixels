import { Box, Flex, Heading, Theme } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <Theme scaling="110%">
      <Flex justify="between" gap="9" className="h-screen">
        <Box className="relative h-screen hidden lg:block">
          <video
            autoPlay
            playsInline
            loop
            muted
            className="h-screen w-[400px] object-cover"
            src="https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949"
          />
          <Heading className="absolute top-0 left-0 p-6 text-white">
            Pixels
          </Heading>
        </Box>
        {children}
      </Flex>
    </Theme>
  );
}
