import type { ActionReturn } from "svelte/action";

export interface ShortcutOptions {
	key: string;
	ctrl?: boolean;
	callback: (e: KeyboardEvent) => void;
}

/**
 * Svelte 5 action for keyboard shortcuts.
 * Attach to any element; shortcuts fire only when no input/textarea/select
 * or contenteditable element is focused.
 *
 * Usage:
 * <script lang="ts">
 *   import { shortcut } from 'bindrunes';
 * </script>
 * <div use:shortcut={{ key: 'k', ctrl: true, callback: () => openSearch() }}>
 *
 * Supports arrays for multiple shortcuts:
 * <div use:shortcut={[
 *   { key: 'k', ctrl: true, callback: () => openSearch() },
 *   { key: 'Escape', callback: () => closePanel() },
 * ]}>
 */
export function shortcut(
	node: HTMLElement,
	options: ShortcutOptions | ShortcutOptions[],
): ActionReturn {
	const list = Array.isArray(options) ? options : [options];

	function handleKeyDown(event: KeyboardEvent) {
		const active = document.activeElement;
		if (
			active &&
			(active.tagName === "INPUT" ||
				active.tagName === "SELECT" ||
				active.tagName === "TEXTAREA" ||
				active.getAttribute("contenteditable") === "true")
		) {
			return;
		}

		for (const opt of list) {
			const matchKey = event.key.toLowerCase() === opt.key.toLowerCase();
			const matchCtrl = opt.ctrl ? event.metaKey || event.ctrlKey : true;

			if (matchKey && matchCtrl) {
				event.preventDefault();
				opt.callback(event);
			}
		}
	}

	window.addEventListener("keydown", handleKeyDown);

	return {
		destroy() {
			window.removeEventListener("keydown", handleKeyDown);
		},
	};
}
