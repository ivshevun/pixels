"use client";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function GoogleButton({ className }: { className?: string }) {
  return (
    <button
      className={`flex items-center bg-gray-900  rounded-full shadow-md py-4 text-lg font-medium text-white gap-2 hover:bg-gray-400 duration-500 ${className} `}
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
    >
      <FcGoogle />
      <span>Sign in with Google</span>
    </button>
  );
}
