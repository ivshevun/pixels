import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import { changeTitle } from "@/lib/redux/features/shotCreation/shotCreationSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function ShotName() {
  const dispatch = useAppDispatch();
  const { shotTitle: content } = useShotCreationInfo();

  return (
    <input
      className="w-3/4 h-auto py-16 min-h-28 flex flex-col mx-auto whitespace-pre-wrap text-center items-center text-2xl md:text-3xl outline-none placeholder:text-zinc-400 placeholder:text-md"
      maxLength={70}
      placeholder="Give me a name"
      value={content}
      onChange={(event) => {
        dispatch(changeTitle(event.target.value));
      }}
      onFocus={() => dispatch(setEditorOpen(false))}
    />
  );
}
