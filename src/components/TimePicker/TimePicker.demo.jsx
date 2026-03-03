import React, { useState } from 'react';
import TimePicker from './TimePicker';

export const TimePickerDemo = () => {
  const [currentTime, setCurrentTime] = useState(2 * 60 * 1000);
  return (
    <div>
      <TimePicker
        value={currentTime}
        onChange={ev => setCurrentTime(ev.target.value)}
        min={2 * 60 * 1000}
        max={4.5 * 60 * 1000}
      />
      {currentTime}
    </div>
  );
};
