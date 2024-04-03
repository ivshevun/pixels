"use client";
import AuthInput from "@/app/auth/components/AuthInput";
import { Flex } from "@radix-ui/themes";
import { UseFormRegisterReturn } from "react-hook-form";

export default function Inputs({
  registers,
}: {
  registers: {
    [key: string]: UseFormRegisterReturn;
  };
}) {
  return (
    <Flex direction="column" gap="4" className="w-full">
      <LabeledInput label="Username" register={registers["username"]} />
      <LabeledInput label="Name" register={registers["name"]} />
    </Flex>
  );
}

const LabeledInput = ({
  label,
  register,
}: {
  label: string;
  register: UseFormRegisterReturn;
}) => {
  return (
    <Flex direction="column" className="w-full">
      <label className="text-sm text-gray-400">{label}</label>
      <AuthInput className="py-1" register={register} />
    </Flex>
  );
};
