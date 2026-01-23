// Possible focusable element selectors in the modal
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
   * Handle 'Tab' and 'Shift+Tab' keypresses to trap keyboard focus within modal
   * @param {Event} event keydown event
   * @param {Boolean} isOpen modal status
   */
export const handleFocusTrap = (event, isOpen) => {
  if (event.key !== 'Tab' || !open) return;

  // Do nothing if the DOM element does not exist
  const dialog = document.querySelector('[role="dialog"]');
  if (!dialog) return [];

  // Get all focusable elements within the modal
  const focusableElements = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTORS));

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const currentElement = document.activeElement;

  if (event.shiftKey) {
    // Shift + Tab -> move backwards
    if (currentElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  } else {
    // Tab -> move forwards
    if (currentElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
};
