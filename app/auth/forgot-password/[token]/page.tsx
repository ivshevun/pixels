"use client";
import { passwordSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import ErrorHandling from "../../components/ErrorHandling";

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function PasswordFormPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "all",
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      // add token to the data
      const extendedData = {
        ...data,
        token: params.token,
      };

      await axios.post("/api/auth/change-password", extendedData);
      router.push("/auth/signin");

      toast.success("Password changed!");
    } catch (error) {
      if (axios.isAxiosError(error)) setError(error.response?.data.error);
    }
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      key="form-wrapper"
      className="mx-auto lg:mx-0 lg:mr-auto px-8 items-start md:w-1/2 lg:w-1/3"
    >
      <motion.form
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex flex-col gap-y-10 w-full xl:w-3/4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex direction="column" gap="2">
          <Heading size="4" className="text-center lg:text-left">
            Reset your password
          </Heading>
          <ErrorHandling errors={errors} networkError={error} />
        </Flex>
        <Flex direction="column" gap="1">
          <Flex justify="between" align="center">
            <label className="text-sm font-bold">New password</label>
            <Text
              className="text-xs text-gray-400  cursor-pointer"
              onClick={() => setShowPassword((prevShow) => !prevShow)}
            >
              {showPassword ? "Hide password" : "Show password"}
            </Text>
          </Flex>
          <AuthInput
            type={showPassword ? "text" : "password"}
            register={register("password")}
          />
          <Text className="text-sm text-gray-400">Minimum 6 characters</Text>
          <AuthButton disabled={isSubmitting} className="py-3">
            Change password
          </AuthButton>
        </Flex>
      </motion.form>
    </Flex>
  );
}
