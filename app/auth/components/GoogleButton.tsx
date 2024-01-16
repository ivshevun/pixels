"use client";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function GoogleButton({ className }: { className?: string }) {
  return (
    <button
      className={`flex items-center bg-white rounded-full border py-4 text-lg font-medium text-indigo-950 gap-2 duration-500 ${className} `}
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
