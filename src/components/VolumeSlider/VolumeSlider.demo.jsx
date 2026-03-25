import React, { useState } from 'react';
import VolumeSlider from './VolumeSlider';

export const VolumeSliderDemo = () => {
  const [volume, setVolume] = useState(70);
  return (
    <VolumeSlider
      volume={volume}
      onVolumeChanged={setVolume}
    />
  );
};
