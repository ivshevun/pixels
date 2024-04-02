import log from "@/lib/log";
import { AppDispatch } from "@/lib/redux/store";
import { Action } from "@reduxjs/toolkit";
import { ChangeEvent, SetStateAction } from "react";

const handleFileChange = async (
  event: ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<SetStateAction<File | null>>,
  changeFileUrl: (url: string) => void
) => {
  if (!event.target.files) return;

  const currentFile = event.target.files[0];

  setFile(currentFile);
  changeFileUrl(URL.createObjectURL(currentFile));

  currentFile && log("File during uploading", currentFile);
};

export default handleFileChange;
