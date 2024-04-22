import InfiniteFeed from "../InfiniteFeed";

export default function page() {
  return <InfiniteFeed className="pt-16" />;
}

export const generateMetadata = () => {
  return {
    title: "Search | Pixels",
    description: "Search the Pixels for inspiration",
  };
};
