import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RichTextEditor } from './RichTextEditor';
import { useRichTextStore } from './useRichTextStore';

describe('RichTextEditor component', () => {
  beforeEach(() => {
    cleanup();
    useRichTextStore.setState({ editor: null });
  });

  it('renders EditorContent with initial content', () => {
    render(<RichTextEditor initialContent="<p>Hello</p>" />);
    const editor = screen.getByTestId('editor-content');
    expect(editor).toBeInTheDocument();
  });

  it('stores editor in Zustand store on mount and clears on unmount', () => {
    const { unmount } = render(<RichTextEditor initialContent="<p>Test</p>" />);
    expect(useRichTextStore.getState().editor).not.toBeNull();

    unmount();
    expect(useRichTextStore.getState().editor).toBeNull();
  });

  it('calls onBlur with HTML content', () => {
    const handleBlur = vi.fn();
    render(
      <RichTextEditor initialContent="<p>Blur me</p>" onBlur={handleBlur} />
    );

    const editor = screen.getByTestId('editor-content');
    fireEvent.blur(editor);

    expect(handleBlur).toHaveBeenCalledTimes(1);
    expect(handleBlur.mock.calls[0][0]).toContain('<p>');
  });

  it('applies className', () => {
    render(<RichTextEditor initialContent="" className="custom-class" />);
    expect(screen.getByTestId('editor-content')).toHaveClass('custom-class');
  });

  it('updates editor content when typing', () => {
    render(<RichTextEditor initialContent="<p></p>" />);
    const editor = useRichTextStore.getState().editor;

    editor?.commands.setContent('<p>Typed text</p>');

    expect(editor?.getHTML()).toContain('Typed text');
  });

  it('snapshot editor', () => {
    const { container } = render(
      <RichTextEditor initialContent="<p>Hello World!</p>" />
    );
    expect(container).toMatchSnapshot();
  });
});
