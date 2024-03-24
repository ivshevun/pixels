import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
export default function IconButton({ children, ...props }: Props) {
  return (
    <button
      className="bg-white text-black p-3 rounded-full cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
