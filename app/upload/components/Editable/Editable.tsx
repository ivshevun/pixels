import { EditorContent, EditorContentProps } from "@tiptap/react";
import "./Editable.styles.css";

interface EditableProps extends EditorContentProps {
  content?: string;
  setContent?: (content: string) => void;
}

export default function Editable({ editor, onFocus, onBlur }: EditableProps) {
  return (
    <EditorContent
      editor={editor}
      onFocus={onFocus}
      onBlur={onBlur}
      className="w-full"
    />
  );
}
