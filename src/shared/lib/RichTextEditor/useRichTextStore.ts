import type { Editor } from '@tiptap/core';
import { create } from 'zustand';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface RichTextState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;

  toggleBold: () => void;
  toggleItalic: () => void;
  toggleStrike: () => void;
  toggleUnderline: () => void;
  toggleHeading: (level: HeadingLevel) => void;
}

export const useRichTextStore = create<RichTextState>((set, get) => ({
  editor: null,

  setEditor: (editor) => set((state) => ({ ...state, editor })),

  toggleBold: () => {
    const editor = get().editor;
    if (editor) editor.chain().focus().toggleBold().run();
  },
  toggleItalic: () => {
    const editor = get().editor;
    if (editor) editor.chain().focus().toggleItalic().run();
  },
  toggleStrike: () => {
    const editor = get().editor;
    if (editor) editor.chain().focus().toggleStrike().run();
  },
  toggleUnderline: () => {
    const editor = get().editor;
    if (editor) editor.chain().focus().toggleUnderline().run();
  },

  toggleHeading: (level) => {
    const editor = get().editor;
    if (editor) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  },
}));
