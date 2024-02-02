"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function TransparentButton({ children }: Props) {
  return (
    <button className="border rounded-full py-3 w-3/4 text-xs hover:border-gray-300 transition-colors mt-2 font-semibold">
      {children}
    </button>
  );
}
