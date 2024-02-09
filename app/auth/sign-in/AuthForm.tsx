"use client";
import { loginSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Separator, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DarkButton from "../../components/DarkButton";
import AuthInput from "../components/AuthInput";
import ErrorHandling from "../components/ErrorHandling";
import AnimatedForm from "../components/AnimatedForm";

type AuthFormData = z.infer<typeof loginSchema>;

const networkErrors: { [key: string]: string } = {
  CredentialsSignin: "Invalid login or password",
};

export default function AuthForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const URLError = useSearchParams().get("error");
  const errorMessage = URLError ? networkErrors[URLError] : "";

  const handleInputChange = () => {
    if (URLError) router.push("/auth/sign-in");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (data: AuthFormData) => {
    await signIn("credentials", {
      login: data.login,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <AnimatedForm onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Separator orientation="horizontal" my="3" size="4" className="w-full" />

      <ErrorHandling errors={errors} networkError={errorMessage} />

      {/* Inputs */}
      <Flex direction="column" className="gap-y-5">
        {/* Username input */}
        <Flex direction="column">
          <label>Email or Username</label>
          <AuthInput
            width="400px"
            register={register("login")}
            maxLength={255}
            onChange={handleInputChange}
          />
        </Flex>

        {/* Password input */}
        <Flex direction="column">
          <Flex justify="between" align="center">
            <label>Password</label>
            <Link className="text-sm underline" href="/auth/forgot-password">
              Forgot?
            </Link>
          </Flex>
          <AuthInput
            type={showPassword ? "text" : "password"}
            register={register("password")}
            maxLength={20}
            onChange={handleInputChange}
          />
          <Text
            onClick={() => setShowPassword((prevShow) => !prevShow)}
            className="text-sm mt-1 cursor-pointer"
          >
            {showPassword ? "Hide password" : "Show password"}
          </Text>
        </Flex>
        <Flex direction="column">
          <DarkButton disabled={isSubmitting}>Sign In</DarkButton>
          <Flex className="text-sm justify-center gap-1 text-gray-400">
            <Text>Don`t have an account?</Text>
            <Link className="underline" href="/auth/new-user">
              Sign Up
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </AnimatedForm>
  );
}
