import { useRef, useCallback, useLayoutEffect } from 'react';

/**
 * Patch MUI's v3 Slider markup for accessibility. It natively renders role="slider"
 * and all aria-* attributes on a non-focusable div container, while the actual focusable
 * element is a nested button without role/aria-* attributes. This is flagged by a11y
 * checker tools in Timeliner.
 * This patch moves the role="slider" and the relevant aria-* attributes onto the focusable
 * thumb button.
 * @param {HTMLElement} sliderContainer element wrapping the MUI Slider
 * @param {Object} options
 * @param {String} options.label accessible name for the slider
 * @param {Number} options.value current slider value
 * @param {Number} options.min minimum slider value
 * @param {Number} options.max maximum slider value
 * @param {Function} options.getValueText func to forma the value for aria-valuetext
 * @param {String} options.thumbSelector selector for the thumb button if exists
 */
export function patchSliderA11y(sliderContainer, { label, value, min, max, getValueText, thumbSelector = 'button' }) {
  if (!sliderContainer) return;

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

  // Find the slider thumb and make it accessible
  const thumbButton = sliderContainer.querySelector(thumbSelector);
  if (thumbButton) {
    thumbButton.setAttribute('role', 'slider');
    thumbButton.setAttribute('aria-label', label);
    thumbButton.setAttribute('aria-valuemin', String(min));
    thumbButton.setAttribute('aria-valuemax', String(max));
    thumbButton.setAttribute('aria-valuenow', String(value));
    thumbButton.setAttribute(
      'aria-valuetext',
      getValueText ? getValueText(value) : String(value)
    );
    thumbButton.setAttribute('aria-orientation', 'horizontal');
  }
}

/**
 * A wrapper in the form of a custom hook around 'patchSliderA11y'
 * function for functional components.
 * @param {Number} value current slider value
 * @param {String} label accessible label text
 * @param {Number} min minimum value of slider range
 * @param {Number} max maximum value of slider range
 * @param {Function} getValueText callback function to get the current value-text
 * @param {Object} options optional configuration
 * @returns {
 *  containerRef
 * }
 */
export default function useSliderA11y(value, label, min, max, getValueText, options = {}) {
  const { muteButtonSelector } = options;
  const containerRef = useRef();

  const applyA11yEnhancements = useCallback(() => {
    patchSliderA11y(containerRef.current, {
      label, value, min, max, getValueText,
      thumbSelector: muteButtonSelector ? `button:not(${muteButtonSelector})` : 'button',
    });
  }, [value, label, min, max, getValueText, muteButtonSelector]);

  /* Apply the a11y fixes in 'patchSliderA11y()' to th current element using
  'useLayoutEffect', so that it applies asynchronously before browser paints the screen.
  This avoids any UI glitches/flashes due to timing issues between timeliner code and
  MUI markup */
  useLayoutEffect(() => {
    applyA11yEnhancements();
  }, [applyA11yEnhancements]);

  return { containerRef };
}
