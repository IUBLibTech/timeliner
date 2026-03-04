import React, { useState } from 'react';
import ColorPaletteSwitcher from './ColorPaletteSwitcher';

export const ColorPaletteSwitcherDemo = () => {
  const [currentKey, setCurrentKey] = useState('default');
  return (
    <div>
      <ColorPaletteSwitcher currentKey={currentKey} onChange={setCurrentKey} />
      <p style={{ marginTop: 16 }}>
        Current palette: <strong>{currentKey}</strong>
      </p>
    </div>
  );
};
