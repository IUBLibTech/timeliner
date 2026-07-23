import React, { useCallback, useState } from 'react';
import './VolumeSliderCompact.scss';
import PropTypes from 'prop-types';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOff from '@material-ui/icons/VolumeOff';
import Slider from '@material-ui/lab/Slider';
import useSliderA11y from '../../hooks/useSliderA11y';

const SPEAKER_ICON_SIZE = {
  width: 20,
  height: 20,
};

function VolumeSliderCompact({ volume, onVolumeChanged, flipped, disabled }) {
  const [previousVolume, setPreviousVolume] = useState(null);

  const { containerRef } = useSliderA11y(volume, 'Volume', 0, 100, v => `${v} percent`,
    { muteButtonSelector: '.volume-slider-compact__muter' });

  /* Fix broken onChange event handler in MUI v3 Slider for mouse/touch interactions.
  For these events, the 'value' arg passed by MUI's callback is unreliable. Therefore,
  branch the handler based on the event type to recompute the 'value' arg from the pointer
  position instead of using the native arg value for mouse/touch events. */
  const onVolumeInputChange = (ev, value) => {
    if (!(ev.nativeEvent instanceof KeyboardEvent)) {
      const rect = ev.currentTarget.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      value = (x / rect.width) * 100 || 100;
    }

    if (onVolumeChanged != undefined) {
      onVolumeChanged(parseInt(value, 10));
    }
  };

  const onToggle = () => {
    if (onVolumeChanged) {
      if (volume === 0) {
        onVolumeChanged(previousVolume || 100);
      } else {
        setPreviousVolume(volume);
        onVolumeChanged(0);
      }
    }
  };

  /**
   * Build the mute/unmute button into the DOM and place it on either left/right of the
   * slider based on the 'flipped' prop value respectively (true/false). This allows the tab
   * order to be the same as the visual order of the slider and the button.
   */
  const muteButton = (
    <button
      className='volume-slider-compact__muter'
      onClick={onToggle}
      aria-label={volume === 0 ? "Unmute" : "Mute"}
      disabled={disabled}
      type="button"
    >
      {volume === 0 ? (
        <VolumeOff
          style={{ ...SPEAKER_ICON_SIZE, transform: 'translateX(1px)' }}
        />
      ) : volume <= 40 ? (
        <VolumeDown
          style={{ ...SPEAKER_ICON_SIZE, transform: 'translateX(-0.5px)' }}
        />
      ) : (
        <VolumeUp
          style={{ ...SPEAKER_ICON_SIZE, transform: 'translateX(1px)' }}
        />
      )}
    </button>
  );

  return (
    <div
      ref={containerRef}
      className='volume-slider-compact'
      role="group"
      aria-label="Volume control"
    >
      {flipped && muteButton}
      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={onVolumeInputChange}
        aria-label="Volume"
        disabled={disabled}
      />
      {!flipped && muteButton}
    </div>
  );
}

VolumeSliderCompact.propTypes = {
  /** Current volume value */
  volume: PropTypes.number.isRequired,
  /** Handler for when volume is changed */
  onVolumeChanged: PropTypes.func.isRequired,
  /** Flip the order of the slider and icon */
  flipped: PropTypes.bool,
  disabled: PropTypes.bool,
};

VolumeSliderCompact.defaultProps = {
  volume: 100,
  flipped: false,
};

export default VolumeSliderCompact;
