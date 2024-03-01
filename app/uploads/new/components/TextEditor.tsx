import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { changeDescription } from "@/lib/redux/features/shotInfo/shotSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import Editable from "./Editable/Editable";

export default function TextEditor() {
  const dispatch = useAppDispatch();
  const { shotDescription: content } = useShotInfo();

  return (
    <Editable
      content={content}
      setContent={(content: string) => dispatch(changeDescription(content))}
      onFocus={() => dispatch(setEditorOpen(true))}
      placeholder="Write what went into this design or add any details you’d like to mention"
      className="w-3/4 min-h-28 text-xl text-left px-2 py-4 border-2 border-transparent rounded-lg placeholder:text-lg leading-7 hover:border-gray-200 transition-colors outline-purple-950"
    />
  );
}
