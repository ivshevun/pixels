import { Editor } from "@tiptap/react";

export const synchronizeEditor = (editor: Editor | null, currentModifiers: string[], currentFont: string) => {
    const focusedEditor = editor?.chain().focus();
    // synchronize modifiers
    const modifiersCommands: Record<string, () => void> = {
      bold: () => focusedEditor?.setBold().run(),
      italic: () => focusedEditor?.setItalic().run(),
      underline: () => focusedEditor?.setStrike().run(),
    };
    const fontCommands: Record<string, () => void> = {
      "heading 1": () => focusedEditor?.setHeading({ level: 1 }).run(),
      "heading 2": () => focusedEditor?.setHeading({ level: 2 }).run(),
      text: () => focusedEditor?.setParagraph().run(),
    };

    currentModifiers.forEach((modifier) => modifiersCommands[modifier]());
    // log(currentModifiers);

    // synchronize fonts

    const selectedCommand = fontCommands[currentFont];
    if (selectedCommand) {
      selectedCommand();
    }
  }