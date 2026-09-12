/**
 * Iframe-safe navigation and external link handling utilities.
 * 
 * In embedded iframes (such as Google AI Studio preview), direct calls to
 * window.open() or window.alert()/window.confirm() can trigger:
 * "SecurityError: Blocked a frame with origin ... from accessing a cross-origin frame."
 * 
 * safeOpenUrl creates a temporary <a target="_blank" rel="noopener noreferrer">
 * and triggers navigation safely without throwing or re-entering React rendering loops.
 */

import { SHOP_INFO } from '../data/servicesData';

export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg = 'Hello PATLU ONLINE SERVICE! I would like to inquire about online form fillup & digital services.';
  const msg = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${SHOP_INFO.whatsapp}?text=${msg}`;
}

export function getPhoneCallUrl(): string {
  const cleanPhone = SHOP_INFO.phone.replace(/[^0-9+]/g, '');
  return `tel:${cleanPhone.startsWith('+') ? cleanPhone : `+91${cleanPhone}`}`;
}

export function getUpiPaymentUrl(amount: number, note?: string): string {
  const upiId = SHOP_INFO.upiId;
  const payeeName = encodeURIComponent(SHOP_INFO.upiName);
  const upiNote = encodeURIComponent(note || 'PATLU ONLINE SERVICE');
  return `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${upiNote}`;
}

export function safeOpenUrl(url: string, target: '_blank' | '_self' = '_blank'): void {
  if (!url) return;

  // 1. Attempt window.open synchronously while the user gesture context is active
  try {
    const newWindow = window.open(url, target, 'noopener,noreferrer');
    if (newWindow) {
      try {
        newWindow.opener = null;
      } catch {
        // Suppress any cross-origin opener access check
      }
      return;
    }
  } catch {
    // window.open blocked by iframe sandbox, proceed to anchor fallback
  }

  // 2. Synchronous anchor click fallback with noopener
  try {
    const link = document.createElement('a');
    link.href = url;
    link.target = target;
    link.rel = 'noopener noreferrer';
    link.style.position = 'fixed';
    link.style.left = '-9999px';
    link.style.top = '-9999px';
    link.style.opacity = '0';

    document.body.appendChild(link);
    link.click();

    try {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch {
      // ignore
    }
  } catch (err) {
    console.warn('safeOpenUrl: Navigation could not be triggered by host container:', err);
  }
}
