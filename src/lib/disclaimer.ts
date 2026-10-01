/** localStorage key that records the visitor agreed to the entry disclaimer. */
export const DISCLAIMER_KEY = 'ajm_disclaimer_agreed';

/**
 * Show the disclaimer pop-up automatically on a visitor's first visit.
 * Disabled at the owner's request (Sept 2026). The footer disclaimer text and the
 * footer "Disclaimer" link (which still opens the pop-up) remain.
 * Set to true to restore the first-visit pop-up (BCI Rule 36 practice).
 */
export const SHOW_ENTRY_DISCLAIMER = false;

/**
 * Show the disclaimer text box in the footer (text: `disclaimer.footerText`).
 * Set to false to hide it; the footer "Disclaimer" link stays either way.
 */
export const SHOW_FOOTER_DISCLAIMER = true;
