/**
 * Converts a movie title string into a URL-friendly slug.
 * @param title - The movie title to convert.
 * @returns The slugified string.
 */
export function slugify(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}
