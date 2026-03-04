import React, { useState } from 'react';
import TimelineScrubber from './TimelineScrubber';
import BubbleDisplay from '../BubbleDisplay/BubbleDisplay';
import SingleBubble from '../SingleBubble/SingleBubble';
import { colourPalettes } from '../../config';

const POINTS = {
  'id-1': {
    id: 'id-1',
    startTime: 0,
    endTime: 1000,
    depth: 2,
    label: 'Composition',
    summary: 'some summary',
    isSelected: false,
    colour: '#C797F0',
  },
  'id-2': {
    id: 'id-2',
    startTime: 0,
    endTime: 400,
    depth: 1,
    label: 'Part I',
    summary: 'some summary',
    isSelected: false,
    colour: '#A8F097',
  },
  'id-3': {
    id: 'id-3',
    startTime: 400,
    endTime: 1000,
    depth: 1,
    label: 'Part II',
    summary: 'some summary',
    isSelected: false,
    colour: '#A8F097',
  },
};

const noop = () => { };

const timePoints = Array.from(
  Object.values(POINTS).reduce((_timePoints, bubble) => {
    _timePoints.add(bubble.startTime);
    _timePoints.add(bubble.endTime);
    return _timePoints;
  }, new Set())
);

const runTime = Math.max.apply(null, timePoints);

export const TimelineScrubberWithBubblesDemo = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const editorWidth = 700;

  return (
    <div style={{ width: editorWidth }}>
      <BubbleDisplay
        points={POINTS}
        colourPalette={colourPalettes.default}
        width={editorWidth}
        height={200}
        x={0}
        zoom={1.0}
        onPanStart={noop}
      >
        {pts =>
          pts.map(bubble => (
            <SingleBubble key={bubble.point.id} {...bubble} onPanStart={noop} />
          ))
        }
      </BubbleDisplay>
      <TimelineScrubber
        runTime={runTime}
        currentTime={currentTime}
        timePoints={timePoints}
        onUpdateTime={setCurrentTime}
        isModalOpen={false}
        width={editorWidth}
      />
    </div>
  );
};
