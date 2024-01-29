import { Flex } from "@radix-ui/themes";
import ShotCard from "./components/ShotCard";

export default function Home() {
  return (
    <Flex justify="center" align="center" gap="6">
      <ShotCard />
      <ShotCard />
      <ShotCard />
    </Flex>
  );
}
