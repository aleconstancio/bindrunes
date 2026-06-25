// packages/bindrunes/src/utils/useHaptic.ts
// Haptic feedback via Vibration API
// Client-only, graceful fallback

import { isBrowser } from "./isBrowser";

type HapticPattern = "light" | "medium" | "heavy" | "success" | "warning" | "error" | "selection";

const PATTERNS: Record<HapticPattern, number | number[]> = {
	light: 10,
	medium: 20,
	heavy: 40,
	success: [10, 50, 10],
	warning: [20, 100, 20],
	error: [40, 100, 40, 100, 40],
	selection: 5,
};

export function useHaptic() {
	function vibrate(pattern: HapticPattern | number | number[]) {
		if (!isBrowser || !("vibrate" in navigator)) return;

		if (typeof pattern === "string") {
			navigator.vibrate(PATTERNS[pattern] ?? 10);
		} else {
			navigator.vibrate(pattern);
		}
	}

	return {
		light: () => vibrate("light"),
		medium: () => vibrate("medium"),
		heavy: () => vibrate("heavy"),
		success: () => vibrate("success"),
		warning: () => vibrate("warning"),
		error: () => vibrate("error"),
		selection: () => vibrate("selection"),
		vibrate,
		cancel() {
			if (isBrowser && "vibrate" in navigator) {
				navigator.vibrate(0);
			}
		},
	};
}
