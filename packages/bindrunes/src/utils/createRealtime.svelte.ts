import { toError } from "./toError";

export type RealtimeStatus = "connected" | "reconnecting" | "degraded" | "disconnected";

export interface RealtimeEvent {
	id: string;
	type: string;
	data: unknown;
	seq: number;
}

export interface RealtimeOptions {
	url: string;
	onEvent?: (event: RealtimeEvent) => void;
	onError?: (error: Error) => void;
	getToken?: () => string | null;
	storageKey?: string;
	reconnectDelay?: number;
	maxReconnectDelay?: number;
	gapDismissDelay?: number;
}

export class RealtimeClient {
	#status = $state<RealtimeStatus>("disconnected");
	#hasGap = $state<boolean>(false);
	#lastEvent = $state<RealtimeEvent | null>(null);

	get status() {
		return this.#status;
	}
	get hasGap() {
		return this.#hasGap;
	}
	get lastEvent() {
		return this.#lastEvent;
	}

	private lastEventId: string | null = null;
	private lastSeq: number = -1;
	private controller: AbortController | null = null;
	private retryDelay: number;
	private retryTimer: ReturnType<typeof setTimeout> | null = null;
	private destroyed = false;

	constructor(private options: RealtimeOptions) {
		this.retryDelay = options.reconnectDelay ?? 1000;
	}

	async connect() {
		if (typeof window === "undefined" || this.destroyed) return;

		if (this.controller) this.controller.abort();
		this.controller = new AbortController();
		this.#status = "reconnecting";

		try {
			const { fetchEventSource } = await import("@microsoft/fetch-event-source");

			let localforage:
				| {
						getItem: (key: string) => Promise<string | null>;
						setItem: (key: string, value: string) => Promise<string>;
						removeItem: (key: string) => Promise<void>;
				  }
				| undefined;
			try {
				localforage = (await import("localforage")).default;
			} catch {
				/* optional */
			}

			const { url, onEvent, getToken, storageKey } = this.options;
			const token = getToken?.();

			const headers: Record<string, string> = {
				Accept: "text/event-stream",
				"Last-Event-ID": this.lastEventId || "",
			};
			if (token) headers.Authorization = `Bearer ${token}`;

			fetchEventSource(url, {
				method: "GET",
				headers,
				credentials: "same-origin",
				signal: this.controller.signal,
				onopen: async (response) => {
					if (response.ok) {
						this.#status = "connected";
						this.retryDelay = this.options.reconnectDelay ?? 1000;
					} else if (response.status === 401 || response.status === 403) {
						this.#status = "disconnected";
						throw new Error("Authentication failed");
					} else {
						this.#status = "degraded";
					}
				},
				onmessage: (msg) => {
					if (msg.id) {
						this.lastEventId = msg.id;
						localforage?.setItem(storageKey ?? "bindrunes_last_event_id", msg.id).catch(() => {});
					}

					try {
						const payload = JSON.parse(msg.data);
						const event: RealtimeEvent = {
							id: msg.id,
							type: msg.event || "message",
							data: payload,
							seq: payload.seq ?? -1,
						};

						if (event.type === "SYNC_GAP") {
							this.handleGap();
							return;
						}

						if (this.lastSeq !== -1 && event.seq !== -1 && event.seq !== this.lastSeq + 1) {
							this.handleGap();
						}

						if (event.seq !== -1) this.lastSeq = event.seq;
						this.#lastEvent = event;
						onEvent?.(event);
					} catch {
						/* skip malformed messages */
					}
				},
				onerror: (err) => {
					const error = toError(err);
					if (error.name === "AbortError") {
						this.#status = "disconnected";
						return;
					}
					this.options.onError?.(error);
					this.#status = "degraded";
					throw err;
				},
				onclose: () => {
					this.#status = "disconnected";
					this.scheduleReconnect();
				},
			});
		} catch {
			this.scheduleReconnect();
		}
	}

	disconnect() {
		this.destroyed = true;
		if (this.retryTimer) clearTimeout(this.retryTimer);
		if (this.controller) {
			this.controller.abort();
			this.controller = null;
		}
		this.#status = "disconnected";
	}

	dismissGap() {
		this.#hasGap = false;
	}

	private handleGap() {
		this.#hasGap = true;
		const delay = this.options.gapDismissDelay ?? 5000;
		setTimeout(() => {
			this.#hasGap = false;
		}, delay);
	}

	private scheduleReconnect() {
		if (this.destroyed) return;
		const maxDelay = this.options.maxReconnectDelay ?? 30000;
		this.retryDelay = Math.min(this.retryDelay * 2, maxDelay);
		this.retryTimer = setTimeout(() => this.connect(), this.retryDelay);
	}
}
