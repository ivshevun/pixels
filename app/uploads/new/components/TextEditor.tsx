import classNames from "classnames";
import React from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

export default function TextEditor({
  content,
  setContent,
  setEditorOpen,
}: {
  content: string;
  setContent: (content: string) => void;
  setEditorOpen: (isOpen: boolean) => void;
}) {
  const onContentChange = React.useCallback(
    (event: ContentEditableEvent) => {
      setContent(sanitizeHtml(event.currentTarget.innerHTML));
    },
    [setContent]
  );

  return (
    <ContentEditable
      className={classNames(
        "w-3/4 h-auto min-h-16 text-md text-left py-4 px-2 border-2 border-transparent rounded-lg placeholder:text-lg leading-7 overflow-auto hover:border-gray-200 transition-colors outline-purple-950 empty:before:content-['Write_what_went_into_this_design_or_add_any_details_you’d_like_to_mention.'] empty:before:text-zinc-400"
      )}
      onChange={onContentChange}
      onFocus={() => setEditorOpen(true)}
      html={content}
    />
  );
}
