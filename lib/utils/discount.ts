// ============================================
// 1 KG = Rs 300 OFF  –  Sitewide Promotion
// ============================================

export const KG_DISCOUNT = {
  amount: 300,   // Rs 300 off
  label: '1 KG - Rs 300 OFF',
  shortLabel: 'Rs 300 OFF on 1 KG',
  badge: '🔥 1 KG = Rs 300 OFF',
};

/**
 * Check whether the selected weight equals (or exceeds) 1 kg.
 * Works for both gram-based and kg-based units.
 */
export function is1KgSelection(unitName: string | undefined, selectedValue: string): boolean {
  if (!unitName) return false;
  const unit = unitName.toLowerCase().trim();
  const value = parseFloat(selectedValue);
  if (isNaN(value) || value <= 0) return false;

  if (['kg', 'kgs', 'kilogram', 'kilograms'].includes(unit) && value >= 1) return true;
  if (['gm', 'g', 'gram', 'grams'].includes(unit) && value >= 1000) return true;
  return false;
}

/**
 * Check if a cart-item name indicates it's a 1 kg item.
 * Cart names are formatted as "Product Name - 1 Kg" by the product detail page.
 */
export function is1KgCartItem(itemName: string): boolean {
  return /[-–]\s*1\s*kg\s*$/i.test(itemName);
}

/**
 * Return the discount to apply.  Never discount more than the item price.
 */
export function get1KgDiscount(price: number): number {
  if (price <= KG_DISCOUNT.amount) return 0;
  return KG_DISCOUNT.amount;
}

/**
 * Check if a product uses weight units (kg / gm) rather than pieces.
 */
export function isWeightBasedUnit(unitName: string | undefined): boolean {
  if (!unitName) return false;
  const unit = unitName.toLowerCase().trim();
  return ['kg', 'kgs', 'kilogram', 'kilograms', 'gm', 'g', 'gram', 'grams'].includes(unit);
}
