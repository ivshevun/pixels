"use client";
import { Flex, Heading } from "@radix-ui/themes";
import { motion } from "framer-motion";
import GoogleButton from "../components/GoogleButton";
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
      <motion.div
        key="header-wrapper"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Heading>Sign Up to Pixels</Heading>
        <GoogleButton className="mt-5 w-full flex justify-center hover:bg-gray-400 duration-500" />
      </motion.div>
      <RegisterForm />
    </Flex>
  );
}
