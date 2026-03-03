import React, { useState } from 'react';
import ColorPaletteSwitcher from './ColorPaletteSwitcher';

export const ColorPaletteSwitcherDemo = () => {
  const [currentKey, setCurrentKey] = useState('default');
  return (
    <ColorPaletteSwitcher
      currentKey={currentKey}
      onChange={setCurrentKey}
    />
  );
};
