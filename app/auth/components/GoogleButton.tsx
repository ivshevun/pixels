"use client";
import classNames from "classnames";
import { signIn } from "next-auth/react";
import { ButtonHTMLAttributes } from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = classNames(
    "flex items-center bg-white rounded-full border py-4 text-lg font-medium text-indigo-950 gap-2 duration-500",
    className
  );

  return (
    <button
      className={styles}
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
      {...rest}
    >
      <FcGoogle />
      <span>Sign in with Google</span>
    </button>
  );
}
