"use client";
import SmallText from "@/app/auth/components/SmallText";
import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const features = [
  ["Animated gifs", "High resolution images (png, jpg, gif)"],
  ["Videos (mp4)", "Only upload media you own rights to"],
];

const MediaFeatures = () => {
  return (
    <Flex
      direction={{ initial: "column", md: "row" }}
      gap={{ initial: "4", md: "9" }}
      className="text-left"
    >
      {features.map((featureList, index) => (
        <MediaList key={index}>
          {featureList.map((feature) => (
            <MediaFeature key={feature}>{feature}</MediaFeature>
          ))}
        </MediaList>
      ))}
    </Flex>
  );
};

const MediaList = ({ children }: PropsWithChildren) => {
  return <ul className="flex flex-col gap-2 list-disc">{children}</ul>;
};

const MediaFeature = ({ children }: PropsWithChildren) => {
  return (
    <li>
      <SmallText>{children}</SmallText>
    </li>
  );
};

export default MediaFeatures;
