import TransparentButton from "@/app/components/Buttons/TransparentButton";
import {
  changeDescription,
  changeTags,
  changeTitle,
} from "@/lib/redux/features/shotCreation/shotCreationSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FinalTouches from "./FinalTouches/FinalTouches";

export interface SubmitterProps {
  onSubmit: () => void;
  file: File | null;
  disabled?: boolean;
}

export default function ControlButtons({
  onSubmit,
  file,
  disabled = false,
}: SubmitterProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Flex
      width="100%"
      justify="between"
      className="py-4 px-2 sm:p-6 gap-4 xs:gap-12 sm:gap-4"
    >
      <TransparentButton
        onClick={() => {
          router.push(`/${session?.user?.username}`);

          // reset shot info
          dispatch(changeTitle(""));
          dispatch(changeDescription(""));
          dispatch(changeTags([]));
        }}
        className="px-4"
      >
        Cancel
      </TransparentButton>

      <Flex
        gap="4"
        align="center"
        justify="end"
        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/6"
      >
        {/* Make it disabled if no image is provided */}
        <FinalTouches disabled={disabled} onSubmit={onSubmit} />
      </Flex>
    </Flex>
  );
}
