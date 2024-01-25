import { Metadata } from "next";
import { Fragment, PropsWithChildren } from "react";

// create a layout for generating metadata in one place

export default function layout({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>;
}

export const metadata: Metadata = {
  title: "Change password | Pixels",
};
