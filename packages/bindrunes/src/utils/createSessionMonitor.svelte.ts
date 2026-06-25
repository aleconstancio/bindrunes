export interface SessionMonitorOptions {
	timeout?: number;
	warningBefore?: number;
	events?: string[];
}

function resetTimer(
	activityTimer: ReturnType<typeof setTimeout> | null,
	warningTimer: ReturnType<typeof setTimeout> | null,
	destroyed: boolean,
	onRefresh: () => void,
	onWarning: () => void,
	timeout: number,
	warningBefore: number,
) {
	if (destroyed) return;
	if (activityTimer) clearTimeout(activityTimer);
	if (warningTimer) clearTimeout(warningTimer);

	const newWarningTimer = setTimeout(() => {
		if (!destroyed) onWarning();
	}, timeout - warningBefore);

	const newActivityTimer = setTimeout(() => {
		if (!destroyed) onRefresh();
	}, timeout);

	return { activityTimer: newActivityTimer, warningTimer: newWarningTimer };
}

export function createSessionMonitor(
	onRefresh: () => void,
	_onExpire: () => void,
	onWarning: () => void,
	options: SessionMonitorOptions = {},
): () => void {
	const timeout = options.timeout ?? 30 * 60 * 1000;
	const warningBefore = options.warningBefore ?? 60 * 1000;
	const events = options.events ?? ["mousedown", "keydown", "touchstart", "scroll"];

	let activityTimer: ReturnType<typeof setTimeout> | null = null;
	let warningTimer: ReturnType<typeof setTimeout> | null = null;
	let destroyed = false;

	const handler = () => {
		const timers = resetTimer(
			activityTimer,
			warningTimer,
			destroyed,
			onRefresh,
			onWarning,
			timeout,
			warningBefore,
		);
		if (timers) {
			activityTimer = timers.activityTimer;
			warningTimer = timers.warningTimer;
		}
	};
	for (const e of events) window.addEventListener(e, handler, { passive: true });
	const timers = resetTimer(
		activityTimer,
		warningTimer,
		destroyed,
		onRefresh,
		onWarning,
		timeout,
		warningBefore,
	);
	if (timers) {
		activityTimer = timers.activityTimer;
		warningTimer = timers.warningTimer;
	}

	return () => {
		destroyed = true;
		if (activityTimer) clearTimeout(activityTimer);
		if (warningTimer) clearTimeout(warningTimer);
		for (const e of events) window.removeEventListener(e, handler);
	};
}
