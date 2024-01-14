"use client";
import { userSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Separator, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FC, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import { z } from "zod";

type RegisterFormData = z.infer<typeof userSchema>;
type RegisterFormInputs = "username" | "email" | "password";
type InputProps = {
  placeholder?: string;
  register: UseFormRegister<RegisterFormData>;
  registerType: RegisterFormInputs;
  type?: string;
  maxLength: string;
};

// TODO: set up error handling

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
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) setError(error.response?.data.error);
      console.log(error);
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
      {(Object.keys(errors).length > 0 || error) && (
        <ul className="text-red-500 py-2 text-sm list-disc">
          {Object.entries(errors).map(([field, error]) => (
            <li key={field}>{error.message}</li>
          ))}
          {error && <li>{error}</li>}
        </ul>
      )}

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
            <Input register={register} registerType="username" maxLength="20" />
          </Flex>
          <Flex direction="column">
            <label>Email</label>
            <Input maxLength="45" register={register} registerType="email" />
          </Flex>
        </Flex>
        {/* Password input */}
        <Flex direction="column">
          <label>Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="6+ characters"
            maxLength="25"
            register={register}
            registerType="password"
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
      <button
        disabled={isSubmitting}
        className="bg-gray-900 text-white w-full my-5 py-4 text-xl rounded-full mx-auto hover:bg-gray-400 hover transition duration-500"
      >
        Create Account
      </button>
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

const Input: FC<InputProps> = ({
  placeholder,
  register,
  registerType,
  type = "text",
  maxLength,
}) => {
  return (
    <TextField.Input
      placeholder={placeholder}
      {...register(registerType)}
      type={type}
      maxLength={Number(maxLength)}
      className="px-2 py-6 text-md font-normal border dark:border-white hover:shadow-3xl focus:border-[#ea64d966] focus:shadow-3xl "
    />
  );
};
