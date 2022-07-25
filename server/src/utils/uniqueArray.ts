export function uniqueArray<T>(items: Iterable<T>): T[] {
  return Array.from(new Set(items));
}
