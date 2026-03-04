import React, { useRef, useState, useEffect } from 'react';
import AudioImporter from './AudioImporter';
import Button from '@material-ui/core/Button';

export const AudioImporterDemo = () => {
  const [importedJSON, setImportedJSON] = useState('');
  const [isImporterOpen, setIsImporterOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => { setIsImporterOpen(true); }}
        variant="contained"
        color="primary"
      >
        Open Importer
      </Button>
      <AudioImporter
        open={isImporterOpen}
        onClose={() => {
          setIsImporterOpen(false);
        }}
        onImport={(manifest) => {
          setIsImporterOpen(false);
          setImportedJSON(JSON.stringify(manifest, null, 2));
        }}
      />
      {importedJSON && (
        <div style={{ marginTop: '20px' }}>
          <b>Manifest:</b>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
            {importedJSON}
          </pre>
        </div>
      )}
    </div>
  );
};
