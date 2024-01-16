"use client";
import { Flex } from "@radix-ui/themes";
import OAuth from "../components/OAuth";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      key="form-wrapper"
      className="mx-auto lg:mx-0 lg:mr-auto px-8"
    >
      <OAuth title="Sign Up to Pixels" />
      <RegisterForm />
    </Flex>
  );
}
