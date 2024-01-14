import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import Register from "./Register";

export default function RegisterPage() {
  return (
    <Flex justify="between" gap="9" className="h-screen">
      <Image
        src="https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width="500"
        height="800"
        className="h-screen w-[500px] object-cover hidden lg:block"
        alt=""
        priority
      />
      <Register />
    </Flex>
  );
}

export const metadata: Metadata = {
  title: "Sign Up | Pixels",
};
