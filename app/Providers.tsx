"use client";
import { store } from "@/lib/redux/store";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <Theme scaling="100%">
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </Theme>
    </SessionProvider>
  );
}
