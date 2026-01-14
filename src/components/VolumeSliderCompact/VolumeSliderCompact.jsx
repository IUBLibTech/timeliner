import { useState } from 'react';
import './VolumeSliderCompact.scss';
import PropTypes from 'prop-types';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOff from '@material-ui/icons/VolumeOff';
import Slider from '@material-ui/lab/Slider';
import useVolumeSlider from '../../hooks/useVolumeSlider';

const SPEAKER_ICON_SIZE = {
  width: 20,
  height: 20,
};

function VolumeSliderCompact({ volume, onVolumeChanged, flipped, disabled }) {
  const [previousVolume, setPreviousVolume] = useState(null);

  const { containerRef, onVolumeInputChange } = useVolumeSlider(
    volume,
    onVolumeChanged,
    { muteButtonSelector: '.volume-slider-compact__muter' }
  );

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

  return (
    <div
      ref={containerRef}
      className={flipped ? 'volume-slider-compact volume-slider-compact--flipped' : 'volume-slider-compact'}
      role="group"
      aria-label="Volume control"
    >
      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={onVolumeInputChange}
        aria-label="Volume"
        disabled={disabled}
      />
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
