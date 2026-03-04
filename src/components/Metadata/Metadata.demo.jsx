import React from 'react';
import Metadata from './Metadata';
import { colourPalettes } from '../../config';

const RANGES = [
  {
    id: 'id-1',
    startTime: 0,
    endTime: 60 * 1000,
    depth: 1,
    label: 'Intro',
    summary: 'Some summary for the intro section.',
    isSelected: false,
    colour: '#C797F0',
  },
  {
    id: 'id-2',
    startTime: 0,
    endTime: 40 * 1000,
    depth: 2,
    label: 'Part I',
    summary: 'Some summary for part one.',
    isSelected: false,
    colour: '#A8F097',
  },
  {
    id: 'id-3',
    startTime: 40 * 1000,
    endTime: 60 * 1000,
    depth: 2,
    label: 'Part II',
    summary: 'Some summary for part two.',
    isSelected: false,
    colour: '#A8F097',
  },
];

const noop = () => {};

export function MetadataDemo() {
  return (
    <Metadata
      ranges={RANGES}
      currentTime={30 * 1000}
      runTime={60 * 1000}
      manifestLabel="Example Manifest"
      manifestSummary="An example audio recording."
      colourPalette={colourPalettes.default}
      markers={{}}
      isModalOpen={false}
      onEdit={noop}
      onUpdateRange={noop}
      onDeleteRange={noop}
      onEditProjectMetadata={noop}
      onSaveProjectMetadata={noop}
      onCancelEditingProjectMetadata={noop}
      onSaveButtonClicked={noop}
      onEraseButtonClicked={noop}
      deleteMarker={noop}
      updateMarker={noop}
      setCurrentTime={noop}
      updateProjectStatus={noop}
    />
  );
}
