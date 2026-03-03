import React from 'react';
import BubbleDisplay from './BubbleDisplay';
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

const noop = () => {};

const renderBubbles = points =>
  points.map(bubble => (
    <SingleBubble key={bubble.point.id} {...bubble} onPanStart={noop} />
  ));

export function BubbleDisplayDemo() {
  return (
    <BubbleDisplay
      points={POINTS}
      colourPalette={colourPalettes.default}
      width={600}
      height={200}
      x={0}
      zoom={1}
      onPanStart={noop}
    >
      {renderBubbles}
    </BubbleDisplay>
  );
}

export function BubbleDisplayZoomedDemo() {
  return (
    <BubbleDisplay
      points={POINTS}
      colourPalette={colourPalettes.default}
      width={600}
      height={200}
      x={400}
      zoom={2.0}
      onPanStart={noop}
    >
      {renderBubbles}
    </BubbleDisplay>
  );
}

export function BubbleDisplayClickDemo() {
  return (
    <BubbleDisplay
      points={POINTS}
      colourPalette={colourPalettes.default}
      width={600}
      height={200}
      x={0}
      zoom={1}
      onPanStart={noop}
    >
      {points =>
        points.map(bubble => (
          <SingleBubble
            key={bubble.point.id}
            {...bubble}
            onPanStart={noop}
            onClick={point => {
              alert(JSON.stringify(point));
            }}
          />
        ))
      }
    </BubbleDisplay>
  );
}
