import { describe, expect, it } from 'vitest';
import { getTargetId } from './getTargetId';

describe('getTargetId', () => {
  it('should extract id from string containing data-id attribute', () => {
    const input = '<div data-id="123abc">Content</div>';
    const result = getTargetId(input);
    expect(result).toBe('123abc');
  });

  it('should return undefined when string does not contain data-id attribute', () => {
    const input = '<div class="example">Content</div>';
    const result = getTargetId(input);
    expect(result).toBeUndefined();
  });

  it('should return undefined when input string is empty', () => {
    const input = '';
    const result = getTargetId(input);
    expect(result).toBeUndefined();
  });

  it('should extract id when data-id is at the beginning of the string', () => {
    const input = 'data-id="start-id" other-content';
    const result = getTargetId(input);
    expect(result).toBe('start-id');
  });

  it('should extract id when data-id is at the end of the string', () => {
    const input = 'some content data-id="end-id"';
    const result = getTargetId(input);
    expect(result).toBe('end-id');
  });

  it('should extract id with special characters', () => {
    const input =
      '<element data-id="id-with-dashes_underscores.123">Content</element>';
    const result = getTargetId(input);
    expect(result).toBe('id-with-dashes_underscores.123');
  });

  it('should return undefined when data-id attribute is present but has no value', () => {
    const input = '<div data-id="">Content</div>';
    const result = getTargetId(input);
    expect(result).toBeUndefined();
  });
});
