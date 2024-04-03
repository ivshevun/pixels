import { useSettings } from "@/lib/redux/features/settings/hooks";
import { changeAvatarUrl } from "@/lib/redux/features/settings/settingsSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Avatar, Flex } from "@radix-ui/themes";
import { ChangeEvent, SetStateAction } from "react";

export default function AvatarUploader({
  userImage,
  handleFileChange,
  setAvatar,
}: {
  userImage: string | null | undefined;
  handleFileChange: (
    event: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<SetStateAction<File | null>>,
    changeFileUrl: (url: string) => void
  ) => Promise<void>;
  setAvatar: React.Dispatch<SetStateAction<File | null>>;
}) {
  const dispatch = useAppDispatch();
  const { userAvatarUrl } = useSettings();

  const changeAvatar = (url: string) => dispatch(changeAvatarUrl(url));

  return (
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
          userImage ||
          "https://i.pinimg.com/564x/23/7d/11/237d115aef37f46928913548d631710d.jpg"
        }
        alt="Avatar"
        fallback="?"
      />
      <Flex direction="column" width="100%">
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
          onChange={(event) => handleFileChange(event, setAvatar, changeAvatar)}
        />
      </Flex>
    </Flex>
  );
}
