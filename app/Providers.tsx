"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Theme } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      <Theme scaling="110%">{children}</Theme>
    </UserProvider>
  );
}
