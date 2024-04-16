"use client";
import { toggleNavMenu } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import logo from "@/public/logo.jpg";
import { Flex } from "@radix-ui/themes";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, PropsWithChildren, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Login, { Auth } from "./Login";
import AnimatedMenu from "./components/Animated/AnimatedMenu";
import Overlay from "./components/Overlay";
import useSearchQuery from "@/lib/redux/features/search/hooks";
import { changeSearchQuery } from "@/lib/redux/features/search/searchSlice";

export default function NavBar() {
  const pathname = usePathname();

  const restrictedPaths = ["auth", "upload", "edit", "shots", "not-found"];

  // check if path is restricted
  if (pathname.split("/").some((path) => restrictedPaths.includes(path)))
    return;

  return (
    <Flex
      justify="between"
      align="center"
      className="mx-auto w-full lg:w-[92%] p-4 relative"
    >
      <NavLinks />
      <NavLogo>
        <NavMenu />
        {/* Escape prop drilling using component composition */}
      </NavLogo>
      <NavControl />
    </Flex>
  );
}

const navigation = [
  { label: "Inspiration", href: "/popular" },
  { label: "Go Pro", href: "/subscription" },
];

const linkVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const NavMenu = () => {
  const { isNavMenuOpen: isOpen } = useDisclosure();
  const dispatch = useAppDispatch();

  const handleMenuToggle = () => {
    dispatch(toggleNavMenu());
  };

  return (
    <Flex direction="column" className="lg:hidden">
      <Hamburger
        toggled={isOpen}
        toggle={handleMenuToggle}
        size={32}
        direction="right"
      />
      <Overlay isOverlayed={isOpen} setOverlayed={handleMenuToggle} />

      <AnimatedMenu
        isOpen={isOpen}
        className="items-center"
        transition={{ duration: 0 }}
      >
        {navigation.map((navLink) => (
          <motion.p
            key={navLink.href}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            exit="visible"
            className="overflow-hidden hover:text-gray-400"
            transition={{ duration: 0.3 }}
          >
            <Link href={navLink.href}>{navLink.label}</Link>
          </motion.p>
        ))}
        <Auth />
      </AnimatedMenu>
    </Flex>
  );
};

const NavLinks = () => {
  return (
    <Flex gap="6" className="hidden lg:flex items-center">
      {navigation.map((navLink, index) => (
        <Link key={index} href={navLink.href} className="hover:text-gray-400 ">
          {navLink.label}
        </Link>
      ))}
    </Flex>
  );
};

const NavLogo = ({ children }: PropsWithChildren) => {
  return (
    <Flex align="center" className="select-none">
      {children}
      <Link href="/" className="flex justify-center items-center ">
        <NextImage
          src={logo}
          alt="Pixels"
          className="max-w-28 w-auto h-auto"
          priority
        />
      </Link>
    </Flex>
  );
};

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useSearchQuery();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchQuery(event.target.value));
  };

  return (
    <form
      className="hidden lg:flex items-center px-4 py-3 bg-[#f4f5fb] rounded-full text-base font-normal w-64 xl:w-72 gap-2"
      onSubmit={handleSubmit}
    >
      <CiSearch className="w-6 h-5" />
      <input
        className="flex-grow outline-none bg-transparent"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleQueryChange}
      />
    </form>
  );
};

const NavControl = () => {
  return (
    <Flex justify="between" align="center" gap="5">
      <SearchInput />
      <Link className="lg:hidden" href="/search">
        <FaMagnifyingGlass size="20" />
      </Link>
      <Login />
    </Flex>
  );
};
