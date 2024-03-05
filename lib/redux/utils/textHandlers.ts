/* eslint-disable react-hooks/rules-of-hooks */
import { Editor } from "@tiptap/react";
import {
  changeAlign,
  changeFont,
  changeModifiers,
} from "../features/shotInfo/shotSlice";
import { AppDispatch } from "../store";

export const handleChangeFont = (
  font: string,
  dispatch: AppDispatch,
  editor: Editor | null
) => {
  dispatch(changeFont(font));

  // get font size and convert it to number
  const level = Number(font.split(" ")[1]);

  // check if level if font is heading or a paragraph and set a paragraph
  if (!level) return editor?.chain().focus().setParagraph().run();

  // set a heading level
  editor
    ?.chain()
    .focus()
    .setHeading({ level: level === 1 ? 1 : 2 })
    .run();
};

export const handleChangeModifiers = (
  modifiers: string[],
  dispatch: AppDispatch,
  editor: Editor | null
) => {
  dispatch(changeModifiers(modifiers));
  
  const focusedEditor = editor?.chain().focus();

  const commands: Record<string, () => void> = {
    "bold": () => focusedEditor?.setBold().run(),
    "italic": () => focusedEditor?.setItalic().run(),
    'underline': () => focusedEditor?.setStrike().run(),
  };

  modifiers.forEach(modifier => commands[modifier]());

};

export const handleChangeAlign = (
  align: string,
  dispatch: AppDispatch,
  editor: Editor | null
) => {
  dispatch(changeAlign(align));
};
