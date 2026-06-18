/**
 * Merge class names with basic Tailwind conflict resolution.
 * When two classes share the same utility prefix (e.g. `p-1` and `p-2`),
 * the later class wins. Handles the most common Tailwind prefixes.
 */

// Prefixes where last-wins conflict resolution applies.
// Groups: spacing, sizing, positioning, typography, colors, borders, effects, layout, flex/grid, transition, ring, outline, decoration, list, accent, caret, scroll, overscroll, touch, columns, break, table, will-change, contain
const CONFLICT_PREFIXES = [
	// Spacing
	/^m[xytrblse]?-/,
	/^p[xytrblse]?-/,
	/^gap-/,
	/^gap-[xy]-/,
	// Sizing
	/^w-/,
	/^min-w-/,
	/^max-w-/,
	/^h-/,
	/^min-h-/,
	/^max-h-/,
	/^size-/,
	// Positioning
	/^top-/,
	/^right-/,
	/^bottom-/,
	/^left-/,
	/^inset-/,
	/^inset-[xy]-/,
	/^z-/,
	// Typography
	/^font-/,
	/^leading-/,
	/^tracking-/,
	/^indent-/,
	/^whitespace-/,
	/^word-break-/,
	/^truncate/,
	/^line-clamp-/,
	/^align-/,
	// Colors (bg, text, border, ring, outline, shadow, accent, caret, decoration, fill, stroke)
	/^bg-/,
	/^text-/,
	/^border-/,
	/^ring-/,
	/^outline-/,
	/^shadow-/,
	/^fill-/,
	/^stroke-/,
	/^decoration-/,
	/^accent-/,
	/^caret-/,
	// Border radius
	/^rounded/,
	// Display & layout
	/^block/,
	/^inline/,
	/^hidden/,
	/^flex-/,
	/^grid-/,
	/^col-/,
	/^row-/,
	/^justify-/,
	/^items-/,
	/^content-/,
	/^place-/,
	/^self-/,
	/^overflow-/,
	/^overscroll-/,
	/^visible/,
	/^invisible/,
	/^collapse/,
	/^float-/,
	/^clear-/,
	/^box-/,
	// Effects
	/^opacity-/,
	/^blend-/,
	/^filter-/,
	/^blur-/,
	/^brightness-/,
	/^contrast-/,
	/^grayscale/,
	/^hue-rotate-/,
	/^invert/,
	/^saturate-/,
	/^sepia/,
	/^drop-shadow/,
	/^backdrop-/,
	// Transitions
	/^transition/,
	/^duration-/,
	/^ease-/,
	/^delay-/,
	// Tables
	/^table-/,
	// Pointer events
	/^pointer-/,
	/^touch-/,
	/^select-/,
	/^resize/,
	/^cursor-/,
	/^scroll-/,
	/^snap-/,
	// List style
	/^list-/,
];

/**
 * Extract the conflict group from a Tailwind class name.
 * Returns a key that groups classes that conflict with each other.
 */
function getConflictGroup(cls: string): string | null {
	for (const prefix of CONFLICT_PREFIXES) {
		const match = cls.match(prefix);
		if (match) return match[0];
	}
	return null;
}

export function cn(...inputs: (string | false | null | undefined)[]): string {
	const classes = inputs.filter(Boolean).join(" ").split(/\s+/);

	// Build a map of conflict group → last class index
	const conflictMap = new Map<string, number>();
	const result: string[] = [];

	for (let i = 0; i < classes.length; i++) {
		const cls = classes[i];
		if (!cls) continue;

		const group = getConflictGroup(cls);
		if (group) {
			const existing = conflictMap.get(group);
			if (existing !== undefined) {
				// Replace the previous class in the result array
				result[existing] = cls;
			} else {
				conflictMap.set(group, result.length);
				result.push(cls);
			}
		} else {
			result.push(cls);
		}
	}

	return result.join(" ");
}
