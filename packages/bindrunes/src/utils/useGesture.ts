// packages/bindrunes/src/utils/useGesture.ts
// Touch gesture recognition — swipe, long-press
// Client-only, uses touch events

import { isBrowser } from "./isBrowser";

type GestureDirection = "left" | "right" | "up" | "down";

type SwipeOptions = {
	threshold?: number;
	onSwipe?: (direction: GestureDirection) => void;
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
	onSwipeUp?: () => void;
	onSwipeDown?: () => void;
};

type LongPressOptions = {
	delay?: number;
	onLongPress?: () => void;
};

export function useSwipe(
	element: () => HTMLElement | undefined | null,
	options: SwipeOptions = {},
) {
	const { threshold = 50, onSwipe, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } = options;

	if (!isBrowser) return { destroy() {}, attach(_el: HTMLElement) {} };

	let startX = 0;
	let startY = 0;
	let startTime = 0;

	function onTouchStart(e: TouchEvent) {
		const touch = e.touches[0];
		startX = touch.clientX;
		startY = touch.clientY;
		startTime = Date.now();
	}

	function onTouchEnd(e: TouchEvent) {
		const touch = e.changedTouches[0];
		const dx = touch.clientX - startX;
		const dy = touch.clientY - startY;
		const dt = Date.now() - startTime;

		if (dt > 300) return; // Too slow

		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);

		if (absDx < threshold && absDy < threshold) return;

		let direction: GestureDirection;
		if (absDx > absDy) {
			direction = dx > 0 ? "right" : "left";
		} else {
			direction = dy > 0 ? "down" : "up";
		}

		onSwipe?.(direction);
		if (direction === "left") onSwipeLeft?.();
		if (direction === "right") onSwipeRight?.();
		if (direction === "up") onSwipeUp?.();
		if (direction === "down") onSwipeDown?.();
	}

	return {
		destroy() {
			const el = element();
			if (!el) return;
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchend", onTouchEnd);
		},
		attach(el: HTMLElement) {
			el.addEventListener("touchstart", onTouchStart, { passive: true });
			el.addEventListener("touchend", onTouchEnd, { passive: true });
		},
	};
}

export function useLongPress(
	element: () => HTMLElement | undefined | null,
	options: LongPressOptions = {},
) {
	const { delay = 500, onLongPress } = options;

	if (!isBrowser) return { destroy() {}, attach(_el: HTMLElement) {} };

	let timer: ReturnType<typeof setTimeout> | undefined;

	function onTouchStart() {
		timer = setTimeout(() => onLongPress?.(), delay);
	}

	function onTouchEnd() {
		clearTimeout(timer);
	}

	return {
		destroy() {
			const el = element();
			if (!el) return;
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchend", onTouchEnd);
			el.removeEventListener("touchcancel", onTouchEnd);
		},
		attach(el: HTMLElement) {
			el.addEventListener("touchstart", onTouchStart, { passive: true });
			el.addEventListener("touchend", onTouchEnd);
			el.addEventListener("touchcancel", onTouchEnd);
		},
	};
}
