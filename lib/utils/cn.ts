type ClassValue = string | number | boolean | null | undefined;

/** Merge class names (lightweight — no extra deps). */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}
