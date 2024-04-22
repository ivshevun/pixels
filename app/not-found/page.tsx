import { Flex } from "@radix-ui/themes";
import NotFoundText from "./NotFoundText";

export default function NotFoundPage() {
  return (
    <Flex className="w-full h-screen justify-between overflow-hidden">
      <NotFoundText />
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
