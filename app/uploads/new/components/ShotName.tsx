import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { changeTitle } from "@/lib/redux/features/shotInfo/shotSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Heading } from "@radix-ui/themes";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Editable from "./Editable/Editable";

export default function ShotName({ file }: { file: File | null }) {
  const dispatch = useAppDispatch();
  const { shotTitle: content } = useShotInfo();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Give me a name",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `w-3/4 h-auto py-16 min-h-28 flex flex-col mx-auto whitespace-pre-wrap w-1/2 text-center items-center text-2xl md:text-3xl outline-none`,
      },
    },
    onUpdate: ({ editor }) => {
      dispatch(changeTitle(editor.getHTML()));
    },

    injectCSS: false,
    editable: true,
  });

  if (!file)
    return (
      <Heading className="text-3xl md:text-4xl ">
        What have you been working on?
      </Heading>
    );

  return (
    <Editable editor={editor} onFocus={() => dispatch(setEditorOpen(false))} />
  );
}
