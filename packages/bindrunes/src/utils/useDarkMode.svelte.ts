import { mode, setMode, toggleMode } from "mode-watcher";
import { isBrowser } from "./isBrowser";

export function useDarkMode() {
	let currentMode = $state<"light" | "dark" | undefined>(undefined);

	if (isBrowser) {
		mode.subscribe((v) => {
			currentMode = v;
		});
	}

	return {
		get isDark() {
			return currentMode === "dark";
		},
		get mode() {
			return currentMode;
		},
		toggle: toggleMode,
		set: (m: "light" | "dark") => setMode(m),
	};
}
