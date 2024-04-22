import React from "react";
import SettingsForm from "./SettingsForm";
import { Metadata } from "next";

export default function SettingsPage() {
  return <SettingsForm />;
}

export const metadata: Metadata = {
  title: "Settings | Pixels",
  description: "Edit your user settings",
};
