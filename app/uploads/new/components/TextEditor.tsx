import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotInfo } from "@/lib/redux/features/shotInfo/hooks";
import { changeDescription } from "@/lib/redux/features/shotInfo/shotSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment } from "react";
import Editable from "./Editable/Editable";
import EditorController from "./controllers/Editor/EditorController";

export default function TextEditor() {
  const dispatch = useAppDispatch();
  const { shotDescription: content } = useShotInfo();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          "Write what went into this design or add any details you’d like to mention",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `w-3/4 h-auto py-16 min-h-28 flex flex-col mx-auto whitespace-pre-wrap w-3/4 min-h-28 text-xl text-left px-2 py-4 border-2 border-transparent rounded-lg placeholder:text-lg leading-7 hover:border-gray-200 transition-colors outline-purple-950`,
      },
    },
    onUpdate: ({ editor }) => {
      dispatch(changeDescription(editor.getHTML()));
    },
    injectCSS: false,
    editable: true,
  });

  return (
    <Fragment>
      <Editable onFocus={() => dispatch(setEditorOpen(true))} editor={editor} />
      <EditorController editor={editor} />
    </Fragment>
  );
}
