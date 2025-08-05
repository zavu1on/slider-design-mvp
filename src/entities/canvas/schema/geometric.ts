import type { JSX } from 'react';

export type GeometricFigure = {
  name: 'square' | 'triangle' | 'circle' | 'move-down-left' | 'chevron-left';
  icon: JSX.Element;
};
