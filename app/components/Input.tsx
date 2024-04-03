import { TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
}

const Input = ({
  placeholder,
  register,
  type = "text",
  maxLength,
  className,
  onChange,
}: InputProps) => {
  const styles = classNames(
    "px-2 py-6 text-md font-normal border dark:border-white hover:shadow-3xl focus:border-purple-950 focus:shadow-3xl",
    className
  );

  return (
    <TextField.Input
      {...register}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      className={styles}
    />
  );
};

export default Input;
