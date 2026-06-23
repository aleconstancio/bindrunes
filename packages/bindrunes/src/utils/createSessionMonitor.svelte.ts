export interface SessionMonitorOptions {
	timeout?: number;
	warningBefore?: number;
	events?: string[];
}

let activityTimer: ReturnType<typeof setTimeout> | null = null;
let warningTimer: ReturnType<typeof setTimeout> | null = null;
let destroyed = false;

function resetTimer(
	onRefresh: () => void,
	onWarning: () => void,
	timeout: number,
	warningBefore: number,
) {
	if (destroyed) return;
	if (activityTimer) clearTimeout(activityTimer);
	if (warningTimer) clearTimeout(warningTimer);

	warningTimer = setTimeout(() => {
		if (!destroyed) onWarning();
	}, timeout - warningBefore);

	activityTimer = setTimeout(() => {
		if (!destroyed) onRefresh();
	}, timeout);
}

export function createSessionMonitor(
	onRefresh: () => void,
	onExpire: () => void,
	onWarning: () => void,
	options: SessionMonitorOptions = {},
): () => void {
	const timeout = options.timeout ?? 30 * 60 * 1000;
	const warningBefore = options.warningBefore ?? 60 * 1000;
	const events = options.events ?? ["mousedown", "keydown", "touchstart", "scroll"];

	destroyed = false;
	const handler = () => resetTimer(onRefresh, onWarning, timeout, warningBefore);
	for (const e of events) window.addEventListener(e, handler, { passive: true });
	resetTimer(onRefresh, onWarning, timeout, warningBefore);

	return () => {
		destroyed = true;
		if (activityTimer) clearTimeout(activityTimer);
		if (warningTimer) clearTimeout(warningTimer);
		for (const e of events) window.removeEventListener(e, handler);
	};
}
