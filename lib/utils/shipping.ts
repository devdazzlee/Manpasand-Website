/**
 * Nationwide delivery rules for cart totals, checkout UI, and guest order payloads.
 * Change only here — cart and checkout must not invent parallel constants.
 */
export const deliveryRules = {
  karachiRatePkr: 500,
  outsideKarachiRatePkr: 700,
  /** Subtotal after cart discounts; at or above this, shipping is PKR 0 */
  freeFromSubtotalPkr: 10000,
} as const;

export function isKarachiCity(city?: string | null): boolean {
  const normalized = (city ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');
  return normalized.includes('karachi') || normalized === 'khi';
}

/**
 * @param subtotalAfterDiscountsPkr — same value used for checkout subtotal (after line/kg discounts)
 * @param city — delivery city from checkout; when omitted (cart), Karachi rate is used as the lower estimate
 */
export function getShippingChargePkr(
  subtotalAfterDiscountsPkr: number,
  city?: string | null,
): number {
  if (subtotalAfterDiscountsPkr >= deliveryRules.freeFromSubtotalPkr) {
    return 0;
  }
  if (isKarachiCity(city) || !city?.trim()) {
    return deliveryRules.karachiRatePkr;
  }
  return deliveryRules.outsideKarachiRatePkr;
}

export function formatShippingAmountLabel(
  chargePkr: number,
  options?: { city?: string | null },
): string {
  if (chargePkr <= 0) return 'Free';
  if (!options?.city?.trim()) {
    return `Rs. ${deliveryRules.karachiRatePkr.toLocaleString()} – ${deliveryRules.outsideKarachiRatePkr.toLocaleString()}`;
  }
  return `Rs. ${chargePkr.toLocaleString()}`;
}

/** Short helper line under the shipping row in order summaries */
export function shippingSummaryFootnote(
  chargePkr: number,
  options?: { city?: string | null },
): string {
  const freeAt = `Rs. ${deliveryRules.freeFromSubtotalPkr.toLocaleString()}`;
  if (chargePkr <= 0) {
    return `Complimentary delivery on orders of ${freeAt} or more.`;
  }
  if (!options?.city?.trim()) {
    return `Rs. ${deliveryRules.karachiRatePkr.toLocaleString()} in Karachi, Rs. ${deliveryRules.outsideKarachiRatePkr.toLocaleString()} outside Karachi. Free over ${freeAt}.`;
  }
  if (isKarachiCity(options.city)) {
    return `Karachi delivery Rs. ${deliveryRules.karachiRatePkr.toLocaleString()}. Free over ${freeAt}.`;
  }
  return `Delivery outside Karachi Rs. ${deliveryRules.outsideKarachiRatePkr.toLocaleString()}. Free over ${freeAt}.`;
}
