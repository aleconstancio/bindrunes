import { isBrowser } from "./isBrowser";

export function useUrlParams() {
	function getParam(key: string): string | null {
		if (!isBrowser) return null;
		return new URLSearchParams(window.location.search).get(key);
	}

	function setParam(key: string, value: string | null) {
		if (!isBrowser) return;
		const url = new URL(window.location.href);
		if (value === null || value === "") {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, value);
		}
		window.history.replaceState({}, "", url.toString());
	}

	function setParams(params: Record<string, string | null>) {
		if (!isBrowser) return;
		const url = new URL(window.location.href);
		for (const [key, value] of Object.entries(params)) {
			if (value === null || value === "") {
				url.searchParams.delete(key);
			} else {
				url.searchParams.set(key, value);
			}
		}
		window.history.replaceState({}, "", url.toString());
	}

	function getParams(): Record<string, string> {
		if (!isBrowser) return {};
		const params: Record<string, string> = {};
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.forEach((value, key) => {
			params[key] = value;
		});
		return params;
	}

	function clearParams() {
		if (!isBrowser) return;
		window.history.replaceState({}, "", window.location.pathname);
	}

	return { getParam, setParam, setParams, getParams, clearParams };
}
