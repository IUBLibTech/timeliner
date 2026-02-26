import { useCallback, useState } from 'react';
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

  const { containerRef, onMuteToggle, onVolumeInputChange, onKeyDown } = useVolumeSlider(
    volume,
    onVolumeChanged,
    { muteButtonSelector: '.volume-slider-compact__muter' }
  );

  const onToggle = useCallback(() => {
    if (volume > 0) {
      setPreviousVolume(volume);
      onMuteToggle(0);
    } else {
      onMuteToggle(previousVolume || 100);
    }
  }, [volume, previousVolume, onMuteToggle]);

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
      onKeyDown={onKeyDown}
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
