import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import NavBar from "./NavBar";
import Providers from "./Providers";
import "./globals.css";
import "./theme-config.css";

const inter = Inter({ subsets: ["latin"] });
const monaSans = localFont({
  src: "../public/fonts/Mona-Sans.ttf",
  variable: "--font-mona",
});

export const metadata: Metadata = {
  title: "Pixels",
  description: "Discover the world`s top designers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monaSans.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
