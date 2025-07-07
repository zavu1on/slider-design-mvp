'use client';

import { Component } from 'react';
import { ChromePicker, type ChromePickerProps } from 'react-color';

export class ColorPicker extends Component<ChromePickerProps> {
  render() {
    return <ChromePicker {...this.props} />;
  }
}
