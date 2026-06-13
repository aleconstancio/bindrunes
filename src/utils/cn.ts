/**
 * Merge class names, filtering out falsy values.
 * Simple alternative to tailwind-merge for basic cases.
 */
export function cn(...inputs: (string | false | null | undefined)[]): string {
	return inputs.filter(Boolean).join(" ");
}
