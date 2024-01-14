"use client";
import { Flex, TextField } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import Hamburger from "hamburger-react";
import NextImage from "next/image";
import Link from "next/link";
import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Login, { SignUpButton } from "./Login";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname.includes("/auth")) return;

  return (
    <Flex
      justify="between"
      align="center"
      className="mx-auto w-full lg:w-[92%] p-4 relative"
    >
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-content"
            className="flex flex-col absolute left-0 top-[86px] shadow-md h-auto w-full p-4 gap-3 overflow-hidden items-center bg-white"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0, padding: 0 }}
            transition={{ duration: 0.1 }}
          >
            {navigation.map((navLink) => (
              <motion.a
                key={navLink.href}
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: -500 }}
                className="overflow-hidden hover:text-gray-400"
                transition={{ duration: 0.3 }}
              >
                <Link href={navLink.href}>{navLink.label}</Link>
              </motion.a>
            ))}
            <SignUpButton />
          </motion.div>
        )}
      </AnimatePresence>
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
    <Flex justify="between" align="center" gap="3">
      <TextField.Root className="hidden lg:flex p-1 shadow-none">
        <TextField.Slot>
          <FaMagnifyingGlass />
        </TextField.Slot>
        <TextField.Input
          variant="soft"
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
