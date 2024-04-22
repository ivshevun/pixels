import { Metadata } from "next";
import UploadForm from "./UploadForm";

const UploadPage = () => {
  return <UploadForm />;
};

export const metadata: Metadata = {
  title: "Upload | Pixels",
  description: "Upload your shots",
};

export default UploadPage;
