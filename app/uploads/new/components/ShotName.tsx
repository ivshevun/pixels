import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { changeTitle } from "@/lib/redux/features/shotInfo/shotSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Heading } from "@radix-ui/themes";
import Editable from "./Editable";

export default function ShotName({ file }: { file: File | null }) {
  const dispatch = useAppDispatch();
  const { shotTitle: content } = useShotInfo();

  if (!file)
    return (
      <Heading className="text-3xl md:text-4xl ">
        What have you been working on?
      </Heading>
    );

  return (
    <Editable
      html={content}
      setContent={(content: string) => dispatch(changeTitle(content))}
      placeholder="Give me a name"
      className="w-1/2 text-center items-center text-2xl md:text-3xl outline-none"
      onFocus={() => dispatch(setEditorOpen(false))}
    />
  );
}
