import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Card } from './Card';

describe('Card component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly with title and description (snapshot)', () => {
    const { container } = render(
      <Card title="Test title" description="Test description">
        <p>Card content</p>
      </Card>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders children inside CardContent', () => {
    render(
      <Card title="Card with children">
        <span>Body text</span>
      </Card>
    );

    const content = screen.getByText('Body text');
    expect(content.closest('[data-slot="card-content"]')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Card title="Card with footer" footer={<button>Click me</button>}>
        Content
      </Card>
    );

    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom className to root CardSkeleton', () => {
    render(
      <Card title="Styled card" className="custom-class">
        Content
      </Card>
    );
    const root = screen.getByTestId('card-container');
    expect(root).toHaveClass('custom-class');
  });

  it('applies style overrides for sub-elements', () => {
    render(
      <Card
        title="Styled"
        description="Styled description"
        style={{
          header: 'header-class',
          title: 'title-class',
          description: 'desc-class',
          content: 'content-class',
          footer: 'footer-class',
        }}
        footer={<span>Footer</span>}
      >
        Body
      </Card>
    );

    expect(screen.getByText('Styled').className).toContain('title-class');
    expect(screen.getByText('Styled description').className).toContain(
      'desc-class'
    );
    expect(screen.getByText('Body').className).toContain('content-class');
    expect(screen.getByTestId('card-footer').className).toContain(
      'footer-class'
    );
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Card title="Clickable card" onClick={handleClick}>
        Body
      </Card>
    );

    fireEvent.click(screen.getByTestId('card-container'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot with all props provided', () => {
    const { container } = render(
      <Card
        title="Full card"
        description="Detailed description"
        footer={<button>Footer btn</button>}
        className="outer-class"
        onClick={() => {}}
        style={{
          header: 'header-x',
          title: 'title-x',
          description: 'desc-x',
          content: 'content-x',
          footer: 'footer-x',
        }}
      >
        <div>Full body</div>
      </Card>
    );

    expect(container).toMatchSnapshot();
  });
});
