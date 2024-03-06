import { Editor } from "@tiptap/react";

export const synchronizeEditor = (
  editor: Editor | null,
  currentFont: string,
) => {
  const focusedEditor = editor?.chain().focus();

  const fontCommands: Record<string, () => void> = {
    "heading 1": () => focusedEditor?.setHeading({ level: 1 }).run(),
    "heading 2": () => focusedEditor?.setHeading({ level: 2 }).run(),
    text: () => focusedEditor?.setParagraph().run(),
  };

  // synchronize fonts

  const selectedCommand = fontCommands[currentFont];
  if (selectedCommand) {
    selectedCommand();
  }
};
