import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';

export const LoadingIndicatorProgressDemo = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => (p + 1) % 100);
    }, 500);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <LoadingIndicator loadingPercent={progress} />
      {progress}
    </div>
  );
};
