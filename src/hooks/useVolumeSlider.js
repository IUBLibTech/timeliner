import { useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing volume slider logic
 * Handles volume changes and a11y enhancements for Material-UI v3 slider
 *
 * @param {Number} volume current volume value (0-100)
 * @param {Function} onVolumeChanged callback function when volume changes
 * @param {Object} options optional configuration
 * @returns {
 *  containerRef, onVolumeInputChange
 * }
 */
export default function useVolumeSlider(volume, onVolumeChanged, options = {}) {
  const { muteButtonSelector } = options;
  const containerRef = useRef();

  const onVolumeInputChange = useCallback((e) => {
    // Calculate the volume based on mouse X position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const volumeValue = (x / rect.width) * 100 || 100;
    if (onVolumeChanged) {
      onVolumeChanged(parseInt(volumeValue, 10));
    }
  }, [onVolumeChanged]);

  const enhanceSliderAccessibility = useCallback(() => {
    // Fix Material-UI v3 accessibility issue: remove role="slider" from container div
    // since it contains a button, which creates nested interactive controls
    const sliderContainer = containerRef.current;
    if (sliderContainer) {
      // Find the Material-UI slider container div with role="slider"
      const sliderDiv = sliderContainer.querySelector('[role="slider"]');
      if (sliderDiv) {
        // Remove the role from slider since it's not the actual interactive element
        sliderDiv.removeAttribute('role');
        const attributes = sliderDiv.getAttributeNames();
        // Remove all aria-* attributes to match with its role removal
        attributes.forEach(attrName => {
          if (attrName.startsWith('aria-')) {
            sliderDiv.removeAttribute(attrName);
          }
        });
      }

      // Find the volume thumb and make it accessible, omit mute/unmute button using muteButtonSelector
      const buttonSelector = muteButtonSelector
        ? `button:not(${muteButtonSelector})`
        : 'button';
      const thumbButton = sliderContainer.querySelector(buttonSelector);
      if (thumbButton) {
        thumbButton.setAttribute('role', 'slider');
        thumbButton.setAttribute('aria-label', 'Volume');
        thumbButton.setAttribute('aria-valuemin', '0');
        thumbButton.setAttribute('aria-valuemax', '100');
        thumbButton.setAttribute('aria-valuenow', String(volume));
        thumbButton.setAttribute('aria-valuetext', `${volume} percent`);
        thumbButton.setAttribute('aria-orientation', 'horizontal');
      }
    }
  }, [volume, muteButtonSelector]);

  useEffect(() => {
    enhanceSliderAccessibility();
  }, [enhanceSliderAccessibility]);

  return { containerRef, onVolumeInputChange };
}
