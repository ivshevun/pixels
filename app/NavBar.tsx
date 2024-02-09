"use client";
import { toggleNavMenu } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useDisclosure } from "@/lib/redux/features/disclosure/hooks";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Flex, TextField } from "@radix-ui/themes";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Login, { Auth } from "./Login";
import AnimatedMenu from "./components/AnimatedMenu";
import Overlay from "./components/Overlay";

export default function NavBar() {
  const pathname = usePathname();

  const restrictedPaths = ["auth", "uploads"];

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
  visible: { x: 0 },
  hidden: { x: -500 },
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
    <Flex align="center">
      {children}
      <Link href="/" className="flex justify-center items-center ">
        <NextImage
          width="150"
          height="55"
          src="/logo.svg"
          alt="Pixels"
          className="max-w-36 w-auto h-auto"
          priority
        />
      </Link>
    </Flex>
  );
};

const NavControl = () => {
  return (
    <Flex justify="between" align="center" gap="5">
      <TextField.Root className="hidden lg:flex p-1 shadow-none focus:border-none">
        <TextField.Slot>
          <FaMagnifyingGlass size="16" />
        </TextField.Slot>
        <TextField.Input
          size="3"
          placeholder="Search..."
          radius="full"
          variant="soft"
          className="max-w-72 placeholder:text-gray-600 placeholder:text-base"
        />
      </TextField.Root>
      <Link className="lg:hidden" href="/search">
        <FaMagnifyingGlass size="20" />
      </Link>
      <Login />
    </Flex>
  );
};
