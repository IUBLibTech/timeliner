import React, { useState } from 'react';
import SettingsPopup from './SettingsPopup';
import Button from '@material-ui/core/Button';

export const SettingsPopupDemo = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsJSON, setSettingsJSON] = useState(null);
  return (
    <div>
      <Button onClick={() => setIsSettingsOpen(true)} variant="primary">
        Open Settings
      </Button>
      <SettingsPopup
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={manifest => {
          setIsSettingsOpen(false);
          setSettingsJSON(JSON.stringify(manifest, null, 2));
        }}
      />
      {settingsJSON && (
        <div>
          <b>Manifest:</b>
          <pre>{settingsJSON}</pre>
        </div>
      )}
    </div>
  );
};
