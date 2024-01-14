import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import Providers from "./Providers";
import "./globals.css";
import "./theme-config.css";
import localFont from "next/font/local";

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
      </body>
    </html>
  );
}
