import { TextField } from "@radix-ui/themes";
import { FC, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
}

const AuthInput: FC<InputProps> = ({
  placeholder,
  register,
  type = "text",
  maxLength,
  className,
  onChange,
}) => {
  return (
    <TextField.Input
      {...register}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      className={`px-2 py-6 text-md font-normal border dark:border-white hover:shadow-3xl focus:border-[#ea64d966] focus:shadow-3xl ${className} `}
    />
  );
};

export default AuthInput;
