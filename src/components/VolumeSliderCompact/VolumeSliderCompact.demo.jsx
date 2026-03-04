import React, { useState } from 'react';
import VolumeSliderCompact from './VolumeSliderCompact';

export const VolumeSliderCompactDemo = () => {
  const [volume, setVolume] = useState(70);
  return (
    <VolumeSliderCompact
      volume={volume}
      onVolumeChanged={setVolume}
    />
  );
};

export const VolumeSliderCompactFlippedDemo = () => {
  const [volume, setVolume] = useState(70);
  return (
    <VolumeSliderCompact
      flipped
      volume={volume}
      onVolumeChanged={setVolume}
    />
  );
};
