"use client";
import { userSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Separator, Text } from "@radix-ui/themes";
import axios from "axios";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthButton from "../components/AuthButton";
import AuthInput from "../components/AuthInput";
import ErrorHandling from "../components/ErrorHandling";

type RegisterFormData = z.infer<typeof userSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post("/api/register", data);
      await signIn("credentials", {
        login: data.email || data.username,
        password: data.password,
        callbackUrl: "/",
      });
      await axios.post("/api/emails/welcome", {
        username: data.username,
        email: data.email,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) setError(error.response?.data.error);
      throw error;
    }
  };

  return (
    <motion.form
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Separator orientation="horizontal" my="3" size="4" className="w-full" />

      {/* Render errors only if its not empty */}
      <ErrorHandling errors={errors} networkError={error} />

      {/* Inputs */}
      <Flex direction="column" className="gap-y-5">
        {/* Username and email inputs */}
        <Flex
          direction={{ initial: "column", xs: "row" }}
          justify="between"
          className="gap-x-9 gap-y-4"
        >
          <Flex direction="column">
            <label>Username</label>
            <AuthInput register={register("username")} maxLength={20} />
          </Flex>
          <Flex direction="column">
            <label>Email</label>
            <AuthInput maxLength={45} register={register("email")} />
          </Flex>
        </Flex>
        {/* Password input */}
        <Flex direction="column">
          <label>Password</label>
          <AuthInput
            type={showPassword ? "text" : "password"}
            placeholder="6+ characters"
            maxLength={25}
            register={register("password")}
          />
          <Text
            className="text-right text-sm text-gray-400 mt-2 cursor-pointer"
            onClick={() => setShowPassword((prevShow) => !prevShow)}
          >
            {showPassword ? "Hide password" : "Show password"}
          </Text>
        </Flex>
      </Flex>
      {/* Button */}
      <AuthButton disabled={isSubmitting}>Create Account</AuthButton>
      <Flex
        justify="center"
        align="center"
        gap="2"
        className="text-gray-400 text-sm"
      >
        <Text>Already have an account?</Text>
        <Link href="/api/auth/signin" className="underline">
          Sign in
        </Link>
      </Flex>
    </motion.form>
  );
}
