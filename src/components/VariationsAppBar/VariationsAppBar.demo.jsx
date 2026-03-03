import React from 'react';
import VariationsAppBar from './VariationsAppBar';

const noop = () => {};

export const VariationsAppBarDemo = () => {
  return (
    <VariationsAppBar
      onImportButtonClicked={noop}
      onUndo={noop}
      onRedo={noop}
      onSettingsButtonClicked={noop}
      isModalOpen={false}
    />
  );
};
