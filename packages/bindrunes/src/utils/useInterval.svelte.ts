export function useInterval(callback: () => void, delay: number | null) {
	let id: ReturnType<typeof setInterval> | undefined;

	function start() {
		if (delay === null || delay <= 0) return;
		id = setInterval(callback, delay);
	}

	function destroy() {
		if (id !== undefined) {
			clearInterval(id);
			id = undefined;
		}
	}

	function reset(newDelay?: number) {
		destroy();
		if (newDelay !== undefined) {
			delay = newDelay;
		}
		start();
	}

	start();

	$effect(() => {
		return () => destroy();
	});

	return { destroy, reset };
}
