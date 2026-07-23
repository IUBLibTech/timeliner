import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import useSliderA11y from '../../hooks/useSliderA11y';
import './VolumeSlider.scss';

const SPEAKER_ICON_SIZE = {
  width: 20,
  height: 20,
};

function VolumeSlider({ volume, onVolumeChanged }) {
  const { containerRef } = useSliderA11y(volume, 'Volume', 0, 100, v => `${v} percent`);

  const onVolumeInputChange = (ev, value) => {
    if (!ev.key) {
      // Calculate the volume based on mouse X position
      const rect = ev.currentTarget.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      value = (x / rect.width) * 100 || 100;
    }

    if (onVolumeChanged != undefined) {
      onVolumeChanged(parseInt(value, 10));
    }
  };

  return (
    <div
      ref={containerRef}
      className="volume-slider"
      role="group"
      aria-label="Volume control"
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
