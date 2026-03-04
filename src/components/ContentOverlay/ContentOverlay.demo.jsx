import React, { useRef, useState, useEffect } from 'react';
import ContentOverlay from './ContentOverlay';
import { ERROR_CODES } from '../../constants/canvas';

export const ContentOverlayErrorDemo = () => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div ref={containerRef} style={{ width: '100%', height: 300, position: 'relative', overflow: 'hidden', border: '1px solid #eee' }}>
      {mounted && (
        <ContentOverlay
          error={{ code: 1, description: ERROR_CODES.MEDIA_ERR_SRC_NOT_SUPPORTED }}
          audioUrl={'http://example.com/audio.mp3'}
          isLoaded={true}
          loadingPercent={0}
          DialogProps={{ container: containerRef.current, style: { position: 'absolute' }, BackdropProps: { style: { position: 'absolute' } } }}
        />
      )}
    </div>
  );
};

export const ContentOverlayLoadingDemo = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setProgress(p => (p + 1) % 100), 200);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ width: '100%', height: 300, position: 'relative', border: '1px solid #eee' }}>
      <ContentOverlay error={{ code: 0, description: null }} isLoaded={false} loadingPercent={progress} />
    </div>
  );
};
