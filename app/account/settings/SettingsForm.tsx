"use client";
import AnimatedForm from "@/app/components/Animated/AnimatedForm";
import handleFileChange from "@/app/upload/utils/handleFileChange";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AvatarUploader from "./AvatarUploader";
import Inputs from "./Inputs";
import Submitting from "./Submitting";

import { z } from "zod";

export interface SettingsData {
  username?: string | null;
  name?: string | null;
}

export const settingsSchema = z.object({
  username: z.string().max(20, "Username is too long").optional(),
  name: z.string().max(50, "Name is too long").optional(),
});

export default function SettingsForm() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState("");

  const { data: session, status, update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsData>({
    resolver: zodResolver(settingsSchema),
  });

  if (status === "unauthenticated") return redirect("/auth/sign-in");

  const onSubmit = async (data: SettingsData) => {
    let patchData = {};

    // create new formData to upload an avatar to /avatars folder in s3
    try {
      if (data.name || data.username) {
        patchData = { userId: session?.user.id, ...patchData, ...data };

        const { data: updatedUser, status }: AxiosResponse<User> =
          await axios.patch("/api/user", patchData);

        if (updatedUser && status !== 400) {
          const { image, name, username } = updatedUser;
          update({
            image,
            name,
            username,
          });
          update();
        }
      }

      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar || "");
        formData.append("folder", "avatars");

        // upload an avatar to s3
        const { data: responseData }: AxiosResponse<{ response: string }> =
          await axios.post("/api/upload", formData);

        const avatarUrl = responseData.response;
        patchData = { userId: session?.user.id, avatarUrl };

        await axios.patch("/api/user", patchData);
      }

      router.push("/auth/sign-in");
      toast.success("User information changed!");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.error;

        if (!errorData.name) return setError(error.response?.data.error);

        setError(error.response?.data.error.name);
      }
    }
  };

  return (
    <AnimatedForm
      className="flex flex-col items-center w-3/4 md:w-1/3 mx-auto py-16 md:px-8 xl:px-20 justify-center gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AvatarUploader
        userImage={session?.user.image}
        handleFileChange={handleFileChange}
        setAvatar={setAvatar}
      />
      <Inputs
        registers={{
          username: register("username"),
          name: register("name"),
        }}
      />
      <Submitting error={error} errors={errors} isSubmitting={isSubmitting} />
    </AnimatedForm>
  );
}
