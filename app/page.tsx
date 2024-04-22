import { Metadata } from "next";
import InfiniteFeed from "./InfiniteFeed";

export default function page() {
  return <InfiniteFeed />;
}

export const metadata: Metadata = {
  title: "Feed | Pixels",
  description: "Discover the world`s top designers",
};
