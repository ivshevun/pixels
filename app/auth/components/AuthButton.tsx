import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function AuthButton({ disabled, children }: Props) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="bg-gray-900 text-white w-full my-5 py-4 text-xl rounded-full mx-auto hover:bg-gray-400 hover transition duration-500 disabled:bg-gray-700"
    >
      {children}
    </button>
  );
}
