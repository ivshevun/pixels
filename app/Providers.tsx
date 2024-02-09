"use client";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { EdgeStoreProvider } from "@/lib/edgestore/edgestore";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <Theme scaling="100%">
        <Provider store={store}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </Provider>
      </Theme>
    </SessionProvider>
  );
}
