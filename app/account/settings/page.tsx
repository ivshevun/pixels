"use client";
import AuthInput from "@/app/auth/components/AuthInput";
import ErrorHandling from "@/app/auth/components/ErrorHandling";
import DarkButton from "@/app/components/DarkButton";
import log from "@/lib/log";
import { useSettings } from "@/lib/redux/features/settings/hooks";
import { changeAvatarUrl } from "@/lib/redux/features/settings/settingsSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Flex } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SettingsData {
  username: string;
  name: string;
}

const settingsSchema = z.object({
  username: z
    .string()
    .min(3, "Username is too short")
    .max(20, "Username is too long")
    .optional(),
  name: z
    .string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .optional(),
});

export default function SettingsPage() {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsData>({
    resolver: zodResolver(settingsSchema),
  });
  const dispatch = useAppDispatch();
  const { userAvatarUrl } = useSettings();

  const [avatar, setAvatar] = useState<File | null>(null);

  if (status === "unauthenticated") return redirect("/auth/sign-in");

  const onSubmit = async (data: SettingsData) => {
    if (data.name === "" && data.username === "") return;

    // create new formData to upload an avatar to /avatars folder in s3
    const formData = new FormData();
    formData.append("file", avatar || "");
    formData.append("folder", "avatars");

    // upload an avatar to s3
    const { data: responseData }: AxiosResponse<{ response: string }> =
      await axios.post("/api/upload", formData);

    // update user info
    if (responseData.response) {
      await axios.patch("/api/user", {
        userId: session?.user.id,
        ...data,
        avatarUrl: responseData.response,
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const currentFile = event.target.files[0];

    setAvatar(event.target.files[0]);
    dispatch(changeAvatarUrl(URL.createObjectURL(currentFile)));

    currentFile && log("Avatar during uploading", currentFile);
  };

  const handleFileDelete = () => {
    if (userAvatarUrl) {
      setAvatar(null);
      dispatch(changeAvatarUrl(""));
    }
  };

  return (
    <form
      className="flex flex-col items-center w-3/4 md:w-1/3 mx-auto py-16 md:px-8 xl:px-20 justify-center gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        direction={{ initial: "column", md: "row" }}
        align="center"
        justify="center"
        gap="5"
        className="w-full justify-between"
      >
        <Avatar
          radius="full"
          size={{ initial: "4", md: "5", lg: "8" }}
          src={
            userAvatarUrl ||
            "https://i.pinimg.com/564x/23/7d/11/237d115aef37f46928913548d631710d.jpg"
          }
          alt="Avatar"
          fallback="?"
        />
        <Flex direction="column" gap="2" width="100%">
          <label htmlFor="avatar">
            <div className="border rounded-full text-sm hover:border-gray-300 transition-colors font-semibold disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:text-gray-400 disabled:hover:bg-gray-50 text-center cursor-pointer w-full py-2 md:py-3 text-nowrap px-1">
              Upload new picture
            </div>
          </label>

          <input
            accept="image/*"
            className="hidden"
            type="file"
            id="avatar"
            onChange={handleFileChange}
          />
          <div
            onClick={handleFileDelete}
            className="bg-purple-500 text-white rounded-full w-2/3 self-center text-sm font-semibold px-4 py-3 text-center cursor-pointer text-nowrap"
          >
            Remove
          </div>
        </Flex>
      </Flex>
      <Flex direction="column" gap="4" className="w-full">
        <Flex direction="column" className="w-full">
          <label className="text-sm text-gray-400">
            Username <span className="text-red-500">*</span>
          </label>
          <AuthInput className="py-1" register={register("username")} />
        </Flex>
        <Flex direction="column">
          <label className="text-sm text-gray-400">
            Name <span className="text-red-500">*</span>
          </label>
          <AuthInput className="py-1" register={register("name")} />
        </Flex>
      </Flex>
      <Flex direction="column" className="w-full">
        <DarkButton type="submit" className="w-full py-3">
          Submit
        </DarkButton>
        <ErrorHandling errors={errors} networkError="" />
      </Flex>
    </form>
  );
}
