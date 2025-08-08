'use client';

import React, { type FC, useState } from 'react';
import {
  type RGBColor,
  SketchPicker as ReactColorSketchPicker,
} from 'react-color';

type SketchPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

const rgbaToHex = ({ r, g, b, a = 1 }: RGBColor): string => {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  const alpha = Math.round(a * 255);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
};

export const SketchPicker: FC<SketchPickerProps> = ({ color, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="p-1 bg-white rounded shadow cursor-pointer inline-block"
        onClick={handleClick}
      >
        <div
          className="w-9 h-4 rounded"
          style={{
            background: color,
          }}
        />
      </div>

      {displayColorPicker && (
        <div className="absolute z-50 mt-2">
          <div className="fixed inset-0" onClick={handleClose} />
          <ReactColorSketchPicker
            color={color}
            onChange={(color) => onChange(rgbaToHex(color.rgb))}
          />
        </div>
      )}
    </div>
  );
};
