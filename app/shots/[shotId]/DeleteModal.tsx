import DarkButton from "@/app/components/Buttons/DarkButton";
import TransparentButton from "@/app/components/Buttons/TransparentButton";
import { Shot } from "@prisma/client";
import { Dialog, Flex, Text } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { KeyboardEvent } from "react";

export default function DeleteModal({ shotId }: { shotId: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async () => {
    try {
      const { data: deletedShot, status }: AxiosResponse<Shot> =
        await axios.delete("/api/shot", {
          data: { shotId },
        });

      if (status === 200 && deletedShot) {
        toast.success("Shot deleted");
        router.push(`/${session?.user.username}`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleDelete();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Text className="cursor-pointer">Delete</Text>
      </Dialog.Trigger>
      <Dialog.Content onKeyDown={handleKeyDown}>
        <Dialog.Title className="flex justify-between">
          <Text className="mr-auto">Delete shot</Text>
          <Dialog.Close>
            <button>
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this shot?
        </Dialog.Description>
        <Flex mt="6" gap="4">
          <Dialog.Close>
            <TransparentButton className="px-4 py-2 text-sm">
              Cancel
            </TransparentButton>
          </Dialog.Close>
          <DarkButton onClick={handleDelete} className="px-4 py-2 text-sm">
            Delete
          </DarkButton>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
