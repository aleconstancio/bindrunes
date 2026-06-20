import { mode, setMode, toggleMode } from "mode-watcher";

export function useDarkMode() {
	let currentMode = $state<"light" | "dark" | undefined>(undefined);

	if (typeof window !== "undefined") {
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
