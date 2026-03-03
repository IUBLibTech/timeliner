import React, { useState } from 'react';
import TimePicker from './TimePicker';

export const TimePickerDemo = () => {
  const [currentTime, setCurrentTime] = useState(1 * 60 * 1000);
  return (
    <div>
      <TimePicker
        value={currentTime}
        onChange={value => setCurrentTime(value)}
      />
      {currentTime}
    </div>
  );
};

export const TimePickerDemoWithRange = () => {
  const [currentTime, setCurrentTime] = useState(2 * 60 * 1000);
  return (
    <div>
      <TimePicker
        value={currentTime}
        onChange={value => setCurrentTime(value)}
        min={2 * 60 * 1000}
        max={60 * 60 * 1000}
      />
      {currentTime}
    </div>
  );
};
