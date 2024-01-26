"use client";
import { Flex } from "@radix-ui/themes";
import OAuth from "../components/OAuth";
import RegisterForm from "./RegisterForm";
import { Center } from "../components/Center";

export default function Register() {
  return (
    <Center>
      <OAuth title="Sign Up to Pixels" />
      <RegisterForm />
    </Center>
  );
}
