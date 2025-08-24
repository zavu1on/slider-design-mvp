import { describe, expect, it } from 'vitest';
import { stringToStyle } from './stringToStyle';

describe('stringToStyle', () => {
  it('should convert valid CSS string to style object', () => {
    const input = 'color: red; font-size: 16px; margin: 10px';
    const result = stringToStyle(input);
    expect(result).toEqual({
      color: 'red',
      'font-size': '16px',
      margin: '10px',
    });
  });

  it('should return empty object when input is undefined', () => {
    const result = stringToStyle(undefined);
    expect(result).toEqual({});
  });

  it('should return empty object when input is empty string', () => {
    const result = stringToStyle('');
    expect(result).toEqual({});
  });

  it('should trim whitespace from property names and values', () => {
    const input = '  color  :  blue  ;  margin  :  5px  ';
    const result = stringToStyle(input);
    expect(result).toEqual({
      color: 'blue',
      margin: '5px',
    });
  });

  it('should ignore style declarations without colon separator', () => {
    const input = 'color: red; invalid-declaration; font-size: 14px';
    const result = stringToStyle(input);
    expect(result).toEqual({
      color: 'red',
      'font-size': '14px',
    });
  });

  it('should handle single style declaration', () => {
    const input = 'width: 100px';
    const result = stringToStyle(input);
    expect(result).toEqual({
      width: '100px',
    });
  });

  it('should handle style declaration with empty value', () => {
    const input = 'display: ; color: red';
    const result = stringToStyle(input);
    expect(result).toEqual({
      display: '',
      color: 'red',
    });
  });

  it('should handle style declaration with colon in value', () => {
    const input =
      'background-image: url(http://example.com/image.jpg); color: red';
    const result = stringToStyle(input);
    expect(result).toEqual({
      'background-image': 'url(http://example.com/image.jpg)',
      color: 'red',
    });
  });

  it('should handle trailing semicolon', () => {
    const input = 'color: red; font-size: 16px;';
    const result = stringToStyle(input);
    expect(result).toEqual({
      color: 'red',
      'font-size': '16px',
    });
  });

  it('should handle only semicolons string', () => {
    const input = ';;;';
    const result = stringToStyle(input);
    expect(result).toEqual({});
  });

  it('should handle string with only spaces and semicolons', () => {
    const input = ' ; ; ; ';
    const result = stringToStyle(input);
    expect(result).toEqual({});
  });

  it('should handle CSS custom properties (variables)', () => {
    const input = '--main-color: #333; --spacing-unit: 8px';
    const result = stringToStyle(input);
    expect(result).toEqual({
      '--main-color': '#333',
      '--spacing-unit': '8px',
    });
  });

  it('should handle complex CSS values with multiple spaces', () => {
    const input =
      'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: all 0.3s ease';
    const result = stringToStyle(input);
    expect(result).toEqual({
      'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    });
  });
});
