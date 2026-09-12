/**
 * Safe clipboard copy utility for sandboxed iframe environments.
 * Prevents Uncaught SecurityError: Blocked a frame with origin ... from accessing a cross-origin frame.
 */

export async function safeCopyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // 1. Try modern navigator.clipboard if allowed
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // SecurityError or NotAllowedError in iframe sandbox - fallback to DOM selection
    }
  }

  // 2. Fallback to hidden textarea with execCommand
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.warn('safeCopyToClipboard: copy not permitted by host environment:', err);
    return false;
  }
}
