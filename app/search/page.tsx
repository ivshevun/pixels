"use client";
import { Flex, Heading, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function SearchPage() {
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
    </Flex>
  );
}

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/${searchQuery}`);
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
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
};
