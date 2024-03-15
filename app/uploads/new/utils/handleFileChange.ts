import log from "@/lib/log";
import { changeFileUrl } from "@/lib/redux/features/shotInfo/shotSlice";
import { AppDispatch } from "@/lib/redux/store";
import { ChangeEvent, SetStateAction } from "react";

const handleFileChange = async (
  event: ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<SetStateAction<File | null>>,
  dispatch: AppDispatch
) => {
  if (!event.target.files) return;

  const currentFile = event.target.files[0];

  setFile(currentFile);
  dispatch(changeFileUrl(URL.createObjectURL(currentFile)));

  currentFile && log("File during uploading", currentFile);
};

export default handleFileChange;
