"use client";
import { Flex, Heading, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, PropsWithChildren, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { changeSearchQuery } from "@/lib/redux/features/search/searchSlice";
import useSearchQuery from "@/lib/redux/features/search/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import transliterate from "../utils/transliterate";

const suggestedLinks: { label: string; link: string }[] = [
  {
    label: "landing page",
    link: "/search/landing-page",
  },
  {
    label: "ios",
    link: "/search/ios",
  },
  {
    label: "food",
    link: "/search/food",
  },
  {
    label: "uxdesign",
    link: "/search/uxdesign",
  },
  {
    label: "app design",
    link: "/search/app-design",
  },
];

export default function SearchPage({ children }: PropsWithChildren) {
  return (
    <Flex direction="column" align="center">
      <Flex
        direction="column"
        className={classNames(
          "relative py-16 text-white ",
          `bg-[url('/assets/search-bg.png')] bg-cover bg-no-repeat bg-center bg-[#fd507e] selection:text-black md:bg-contain md:py-36 md:gap-4`
        )}
        align="center"
        width="100%"
      >
        <Heading className="text-4xl md:text-5xl font-bold leading-[56px]">
          Search Pixels
        </Heading>
        <Text className="text-center">
          A lot of images from thousands of inspirational designers
        </Text>
        <SearchInput />
      </Flex>
      <Flex
        className="hidden md:flex pt-12 text-gray-400 font-normal text-sm"
        gap="4"
      >
        <Text>Suggested:</Text>
        {suggestedLinks.map((link) => (
          <Link
            key={link.label}
            href={link.link}
            className="hover:text-gray-500 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </Flex>
      {children}
    </Flex>
  );
}

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useSearchQuery();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedQuery = transliterate(searchQuery);
    router.push(`/search/${formattedQuery}`);
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchQuery(event.target.value));
  };

  return (
    <form
      className="absolute -bottom-8 flex bg-white text-black border items-center w-3/4 md:w-full max-w-[630px] p-4 rounded-lg gap-4 text-base shadow-md"
      onSubmit={handleSubmit}
    >
      <IoIosSearch size="18" className="text-gray-500" />
      <input
        className="outline-none bg-transparent w-full"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleValueChange}
      />
    </form>
  );
};
