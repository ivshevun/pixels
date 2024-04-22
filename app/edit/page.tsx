import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../auth/authOptions";
import UploadForm from "../upload/UploadForm";
import { Metadata } from "next";

interface ParamsProps {
  shotId: string;
}

export default async function page({
  searchParams,
}: {
  searchParams: ParamsProps;
}) {
  const session = await getServerSession(authOptions);
  const { shotId } = searchParams;
  if (!shotId) return redirect("/not-found");

  const shot = await prisma.shot.findUnique({
    where: {
      id: shotId,
    },
  });

  if (!shot) return redirect("/not-found");
  if (shot.userId !== session?.user.id || !session.user.id)
    return redirect(`/shots/${shotId}`);

  return <UploadForm shot={shot} />;
}

export const metadata: Metadata = {
  title: "Edit | Pixels",
  description: "Edit shot page",
};
