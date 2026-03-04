import React, { useState } from 'react';
import KeyboardControlsProvider from './KeyboardControlsProvider';

export const KeyboardControlsProviderDemo = () => {
  const [lastKey, setLastKey] = useState('');
  return (
    <div>
      <KeyboardControlsProvider
        commands={{
          default: (keyCombo) => setLastKey(keyCombo),
          'alt+a': () => setLastKey('special alt a handler'),
        }}
      />
      <p>Last key pressed:<b> {lastKey}</b></p>
    </div>
  );
};
