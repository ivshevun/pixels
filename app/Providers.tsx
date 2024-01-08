"use client";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <Theme scaling="110%">{children}</Theme>
    </SessionProvider>
  );
}
