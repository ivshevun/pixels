"use client";
import {
  Button,
  Image,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="flex justify-center h-24 flex-wrap"
      position="static"
      maxWidth="2xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavLinks className="hidden sm:flex" />
      <NavLogo className="flex justify-center" />
      <NavbarContent className="flex gap-6" justify="end">
        <Input
          placeholder="Search..."
          radius="full"
          startContent={<CiSearch />}
          className="hidden sm:block"
        />
        <Link href="/search" className="sm:hidden">
          <CiSearch size={30} />
        </Link>
        <SignUpButton />
      </NavbarContent>
      <NavMenu />
    </Navbar>
  );
}

interface IClassName {
  className?: string;
}

const navLinks = [
  { label: "Inspiration", href: "/popular" },
  { label: "Go Pro", href: "/subscription" },
];

const NavLinks = ({ className }: IClassName) => {
  return (
    <NavbarContent className={className} justify="start">
      {navLinks.map((navLink, index) => (
        <NavbarItem key={index}>
          <Link
            href={navLink.href}
            className="font-semibold text-lg cursor-pointer"
          >
            {navLink.label}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  );
};

const NavLogo = ({ className }: IClassName) => {
  return (
    <NavbarBrand className={className}>
      <Link href="/">
        <Image
          as={NextImage}
          width="150"
          height="20"
          src="/logo.svg"
          alt="Pixels"
        />
      </Link>
    </NavbarBrand>
  );
};

const SignUpButton = () => {
  return (
    <Fragment>
      <Button color="primary" size="lg" className="hidden sm:block">
        Sign up
      </Button>
      <Button color="primary" className="sm:hidden">
        Sign up
      </Button>
    </Fragment>
  );
};

const NavMenu = () => {
  return (
    <NavbarMenu className="my-5">
      {navLinks.map((item, index) => (
        <NavbarMenuItem key={index}>
          <Link href={item.href}>{item.label}</Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
};
