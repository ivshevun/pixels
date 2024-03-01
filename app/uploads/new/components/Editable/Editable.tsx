import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, EditorContentProps, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Editable.styles.css";

interface EditableProps extends Omit<EditorContentProps, "editor"> {
  content: string;
  setContent: (content: string) => void;
}

export default function Editable({
  content,
  setContent,
  className,
  placeholder,
  onFocus,
}: EditableProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `w-3/4 h-auto py-16 min-h-28 flex flex-col mx-auto whitespace-pre-wrap ${
          className || ""
        }`,
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    injectCSS: false,
    editable: true,
  });

  return <EditorContent editor={editor} onFocus={onFocus} className="w-full" />;
}
