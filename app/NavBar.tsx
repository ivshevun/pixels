"use client";
import { Flex, TextField } from "@radix-ui/themes";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Login, { Auth } from "./Login";
import AnimatedMenu from "./components/AnimatedMenu";
import Overlay from "./components/Overlay";

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  // disable navigation on /auth route
  if (pathname.includes("/auth")) return;

  return (
    <Flex
      justify="between"
      align="center"
      className="mx-auto w-full lg:w-[92%] p-4 relative"
    >
      <Overlay isOverlayed={isOpen} setOverlayed={setOpen} />
      <NavLinks />
      <NavLogo>
        <NavMenu isOpen={isOpen} setOpen={setOpen} />
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

const NavMenu = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Flex direction="column" className="lg:hidden">
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        size={32}
        direction="right"
      />
      {isOpen && (
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
      )}
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
          <FaMagnifyingGlass />
        </TextField.Slot>
        <TextField.Input
          size="3"
          placeholder="Search..."
          radius="full"
          className="max-w-72"
        />
      </TextField.Root>
      <Link className="lg:hidden" href="/search">
        <FaMagnifyingGlass size="20" />
      </Link>
      <Login />
    </Flex>
  );
};
