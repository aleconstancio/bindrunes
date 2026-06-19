interface CreateSessionOptions {
	timeout?: number;
	warningBefore?: number;
	onTimeout?: () => void;
	onWarning?: () => void;
	onActivity?: () => void;
	autoRefresh?: boolean;
	refreshInterval?: number;
	refreshFn?: () => Promise<void>;
}

export function createSession(options: CreateSessionOptions = {}) {
	const {
		timeout = 30 * 60 * 1000,
		warningBefore = 5 * 60 * 1000,
		onTimeout,
		onWarning,
		onActivity,
		autoRefresh = false,
		refreshInterval = 15 * 60 * 1000,
		refreshFn,
	} = options;

	let lastActivity = $state(Date.now());
	let isExpired = $derived(false);
	let showWarning = $derived(false);

	let activityTimer: ReturnType<typeof setInterval> | null = null;
	let refreshTimer: ReturnType<typeof setInterval> | null = null;
	let warningShown = false;

	const activityEvents = ["mousedown", "keydown", "touchstart", "scroll"];

	function trackActivity() {
		lastActivity = Date.now();
		warningShown = false;
		showWarning = false;
		onActivity?.();
	}

	function startTracking() {
		if (typeof window === "undefined") return;

		for (const event of activityEvents) {
			window.addEventListener(event, trackActivity, {
				passive: true,
			});
		}

		activityTimer = setInterval(() => {
			const elapsed = Date.now() - lastActivity;

			if (elapsed >= timeout) {
				isExpired = true;
				onTimeout?.();
				stopTracking();
				return;
			}

			if (elapsed >= timeout - warningBefore && !warningShown) {
				showWarning = true;
				warningShown = true;
				onWarning?.();
			}
		}, 60_000);
	}

	function stopTracking() {
		if (typeof window === "undefined") return;

		for (const event of activityEvents) {
			window.removeEventListener(event, trackActivity);
		}

		if (activityTimer) {
			clearInterval(activityTimer);
			activityTimer = null;
		}

		if (refreshTimer) {
			clearInterval(refreshTimer);
			refreshTimer = null;
		}
	}

	function reset() {
		lastActivity = Date.now();
		isExpired = false;
		showWarning = false;
		warningShown = false;
	}

	if (autoRefresh && refreshFn) {
		refreshTimer = setInterval(async () => {
			try {
				await refreshFn();
				reset();
			} catch {
				// Refresh failed
			}
		}, refreshInterval);
	}

	return {
		get lastActivity() {
			return lastActivity;
		},
		get isExpired() {
			return isExpired;
		},
		get showWarning() {
			return showWarning;
		},
		startTracking,
		stopTracking,
		reset,
	};
}
