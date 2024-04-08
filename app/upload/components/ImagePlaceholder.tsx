import SmallText from "@/app/auth/components/SmallText";
import imagePlaceholder from "@/public/assets/image-placeholder.png";
import { Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Image from "next/image";
import { Fragment } from "react";
import MediaFeatures from "./MediaFeatures";
import { ImSpinner10 } from "react-icons/im";

interface PlaceholderProps {
  isLoading?: boolean;
}

const styles =
  "flex flex-col justify-center items-center rounded-xl w-full lg:w-3/4 xl:w-3/5 h-full md:h-[700px] gap-12 relative overflow-hidden border-2 border-dashed py-4";

export default function ImagePlaceholder({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  return isLoading ? (
    <div className={classNames(styles, "cursor-default")}>
      <ImSpinner10 size="72" className="text-purple-500 animate-spin " />
    </div>
  ) : (
    <PlaceholderContent />
  );
}

const PlaceholderContent = () => {
  return (
    <label htmlFor="file" className={classNames(styles, "cursor-pointer")}>
      <Flex direction="column" gap="2" align="center" className="mt-2">
        <Image
          src={imagePlaceholder}
          className="hidden sm:block w-[85px] h-[92px]"
          alt=""
        />
        <Text>
          Drag and drop an image, or{" "}
          <span className="pb-1 border-b-2 border-purple-500">Browse</span>
        </Text>
        <SmallText>Minimum 1600px width recommended.</SmallText>
      </Flex>
      <MediaFeatures />
    </label>
  );
};
