import {
  Bean,
  Box,
  Candy,
  Cookie,
  CupSoda,
  Droplets,
  Flame,
  FlaskConical,
  GlassWater,
  Globe2,
  Grape,
  HelpCircle,
  IndianRupee,
  LayoutGrid,
  Leaf,
  Nut,
  Package,
  Popcorn,
  ShoppingBasket,
  Sparkles,
  TreePalm,
  Wheat,
  Wind,
  type LucideIcon,
} from 'lucide-react';

type IconRule = { match: (name: string) => boolean; icon: LucideIcon };

/** Most-specific rules first — order matters. */
const CATEGORY_ICON_RULES: IconRule[] = [
  { match: (n) => n.includes('arqiat') || (n.includes('juice') && !n.includes('pickle')), icon: GlassWater },
  { match: (n) => n.includes('scent') || n.includes('perfume'), icon: Wind },
  { match: (n) => n.includes('pickle') || n.includes('jam'), icon: Package },
  { match: (n) => n.includes('confectionery') || n.includes('sweet') || n.includes('mithai'), icon: Candy },
  { match: (n) => n.includes('cracker') || n.includes('nimco') || n.includes('papad'), icon: Cookie },
  { match: (n) => n.includes('snack'), icon: Popcorn },
  { match: (n) => n.includes('beverage') || n.includes('drink'), icon: CupSoda },
  { match: (n) => n.includes('grocery'), icon: ShoppingBasket },
  { match: (n) => n.includes('grain') || n.includes('pulse') || n.includes('rice'), icon: Bean },
  { match: (n) => n.includes('flour') || n.includes('atta'), icon: Wheat },
  { match: (n) => n.includes('date'), icon: TreePalm },
  { match: (n) => n.includes('dry') && n.includes('fruit'), icon: Grape },
  { match: (n) => n.includes('fruit') && !n.includes('dry'), icon: Grape },
  { match: (n) => n.includes('nut'), icon: Nut },
  { match: (n) => n.includes('honey'), icon: Droplets },
  { match: (n) => n.includes('saffron'), icon: Sparkles },
  { match: (n) => n.includes('herb'), icon: Leaf },
  { match: (n) => n.includes('spice') || n.includes('masala'), icon: Flame },
  { match: (n) => n.includes('oil') || n.includes('shampoo') || n.includes('essential'), icon: FlaskConical },
  { match: (n) => n.includes('indian'), icon: IndianRupee },
  { match: (n) => n.includes('irani') || n.includes('iran'), icon: Globe2 },
  { match: (n) => n === 'general' || n.includes('general'), icon: LayoutGrid },
  { match: (n) => n.includes('unknown'), icon: HelpCircle },
];

export function getCategoryIcon(categoryName: string): LucideIcon {
  const name = categoryName.trim().toLowerCase();
  if (!name) return Box;

  for (const rule of CATEGORY_ICON_RULES) {
    if (rule.match(name)) return rule.icon;
  }

  return ShoppingBasket;
}

export function getCategoryDescription(categoryName: string): string {
  const label = categoryName.trim().toLowerCase();
  return `Browse our ${label} collection`;
}
