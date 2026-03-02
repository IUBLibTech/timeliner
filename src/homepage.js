import './main.scss';

/**
 * Remove the "View Documentation" button from the homepage when not running in docz dev mode.
 * This is a bit hacky but allows to keep the homepage and docs in the same file without
 * needing a separate index.html for the homepage.
 */
if (!import.meta.env.VITE_DOCS) {
  const btn = document.querySelector('a[href="/docs"]');
  if (btn) btn.remove();
}
