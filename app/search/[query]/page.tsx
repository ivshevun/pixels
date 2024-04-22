import React from "react";
import SearchResultPage, { ParamsProps } from "./SearchResultPage";

export default function ResultPage({ params: { query } }: ParamsProps) {
  return <SearchResultPage params={{ query }} />;
}

export const generateMetadata = ({ params }: ParamsProps) => {
  return {
    title: `Search - ${params.query}`,
    description: "Search Pixels for inspiration",
  };
};
