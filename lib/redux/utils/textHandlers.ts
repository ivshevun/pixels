/* eslint-disable react-hooks/rules-of-hooks */
import { Editor } from "@tiptap/react";
import { changeTags } from "../features/shotCreation/shotCreationSlice";
import { AppDispatch } from "../store";
import {
  changeAlign,
  changeFont,
  changeModifiers,
} from "../features/shotText/shotTextInfo";

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
    .toggleHeading({ level: level === 1 ? 1 : 2 })
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
    bold: () => focusedEditor?.setBold().run(),
    italic: () => focusedEditor?.setItalic().run(),
    underline: () => focusedEditor?.setUnderline().run(),
  };

  modifiers.forEach((modifier) => {
    const command = commands[modifier];
    command();
  });
};

export const handleChangeTags = (tags: string[], dispatch: AppDispatch) => {
  dispatch(changeTags(tags));
};

export const handleChangeAlign = (
  align: string,
  dispatch: AppDispatch,
  editor: Editor | null
) => {
  dispatch(changeAlign(align));

  const focusedEditor = editor?.chain().focus();

  focusedEditor?.setTextAlign(align).run();
};
