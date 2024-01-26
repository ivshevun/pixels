import { Metadata } from "next";
import Authorization from "./Authorization";

export default function page() {
  return <Authorization />;
}

export const metadata: Metadata = {
  title: "Sign In | Pixels",
};
