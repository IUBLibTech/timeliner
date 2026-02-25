import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import useVolumeSlider from '../../hooks/useVolumeSlider';
import './VolumeSlider.scss';

const SPEAKER_ICON_SIZE = {
  width: 20,
  height: 20,
};

function VolumeSlider({ volume, onVolumeChanged }) {
  const { containerRef, onVolumeInputChange, onKeyDown } = useVolumeSlider(volume, onVolumeChanged);

  return (
    <div
      ref={containerRef}
      className="volume-slider"
      role="group"
      aria-label="Volume control"
      onKeyDown={onKeyDown}
    >
      <VolumeDown color="disabled" style={SPEAKER_ICON_SIZE} aria-hidden="true" />
      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={onVolumeInputChange}
        aria-label="Volume"
      />
      <VolumeUp color="disabled" style={SPEAKER_ICON_SIZE} aria-hidden="true" />
    </div>
  );
}

VolumeSlider.propTypes = {
  /** Current volume value */
  volume: PropTypes.number.isRequired,
  /** Handler for when volume is changed */
  onVolumeChanged: PropTypes.func.isRequired,
};

VolumeSlider.defaultProps = {
  volume: 100,
};

export default VolumeSlider;
