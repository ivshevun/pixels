import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import UserShots from "./UserShots";

export interface UsernameParams {
  params: { username: string };
}

export default async function Dashboard({ params }: UsernameParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  if (!user || !params.username) return redirect("/not-found");

  return (
    <div className="px-4 md:px-0">
      <UserShots user={user} />
    </div>
  );
}

export const generateMetadata = ({ params }: UsernameParams) => {
  return {
    title: `${params.username} | Pixels`,
    description: "Pixels - User Page",
  };
};
