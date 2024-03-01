import classNames from "classnames";
import { useCallback } from "react";
import ContentEditable, {
  ContentEditableEvent,
  Props as ContentEditableProps,
} from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

interface EditableProps extends Omit<ContentEditableProps, "onChange"> {
  setContent: (content: string) => void;
  placeholder?: string;
}

export default function Editable({
  html,
  setContent,
  className,
  onFocus,
  placeholder,
}: EditableProps) {
  const onContentChange = useCallback(
    (event: ContentEditableEvent) => {
      setContent(sanitizeHtml(event.currentTarget.innerHTML));
    },
    [setContent]
  );

  return (
    <ContentEditable
      onChange={onContentChange}
      html={html}
      className={classNames(
        `h-auto min-h-16 flex flex-col empty:before:content-[attr(aria-placeholder)] empty:before:text-zinc-400`,
        className
      )}
      onFocus={onFocus}
      aria-placeholder={placeholder}
    />
  );
}
