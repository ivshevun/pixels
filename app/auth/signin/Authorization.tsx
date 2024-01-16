"use client";
import { Flex } from "@radix-ui/themes";
import OAuth from "../components/OAuth";
import AuthForm from "./AuthForm";

export default function Authorization() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      key="form-wrapper"
      className="mx-auto lg:mx-0 lg:mr-auto px-8 items-start md:w-1/2 lg:w-1/3"
    >
      <OAuth title="Sign In to Pixels" />
      <AuthForm />
    </Flex>
  );
}
