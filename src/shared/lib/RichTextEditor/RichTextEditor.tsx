'use client';

import { type FC, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRichTextStore } from './useRichTextStore';

type RichTextEditorProps = {
  initialContent: string;
  className?: string;
  onBlur?: (html: string) => void;
};

export const RichTextEditor: FC<RichTextEditorProps> = ({
  initialContent,
  className,
  onBlur,
}) => {
  const setEditor = useRichTextStore((store) => store.setEditor);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    immediatelyRender: false,
  });

  useEffect(() => {
    setEditor(editor);
    return () => setEditor(null);
  }, [editor, setEditor]);

  return (
    <EditorContent
      editor={editor}
      className={className}
      onBlur={() => {
        if (editor && onBlur) onBlur(editor.getHTML());
      }}
    />
  );
};
