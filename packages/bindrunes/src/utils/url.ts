/**
 * Validates that a URL is safe for client-side navigation.
 * Only allows relative paths or same-origin URLs.
 * Blocks protocol-relative URLs (//evil.com), absolute URLs, and javascript: URIs.
 */
export function isSafeRedirect(url: string): boolean {
	if (!url) return false;
	// Block protocol-relative URLs
	if (url.startsWith("//")) return false;
	// Block absolute URLs with scheme
	if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) return false;
	// Must start with / (relative path)
	if (!url.startsWith("/")) return false;
	return true;
}
