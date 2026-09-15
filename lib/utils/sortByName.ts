/** Case-insensitive A–Z sort by `name`. */
export function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) =>
    a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
  );
}
