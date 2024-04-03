"use client";
import ErrorHandling from "@/app/auth/components/ErrorHandling";
import DarkButton from "@/app/components/DarkButton";
import { Flex } from "@radix-ui/themes";
import { FieldErrors } from "react-hook-form";

export default function Submitting({
  error,
  errors,
  isSubmitting,
}: {
  isSubmitting: boolean;
  errors: FieldErrors<{ message: string }>;
  error: string;
}) {
  return (
    <Flex direction="column" className="w-full">
      <DarkButton disabled={isSubmitting} type="submit" className="w-full py-3">
        Submit
      </DarkButton>
      <ErrorHandling errors={errors} networkError={error} />
    </Flex>
  );
}
