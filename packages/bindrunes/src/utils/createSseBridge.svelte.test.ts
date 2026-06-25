import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleSSEEvent } from "./createSseBridge.svelte";

// Mock the query cache
vi.mock("./queryCache", () => ({
	invalidateQuery: vi.fn(),
}));

import { invalidateQuery } from "./queryCache";

describe("handleSSEEvent", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("invalidates correct cache key for event.created", () => {
		const routes = { "event.created": "/api/events" };
		handleSSEEvent("event.created", routes);
		expect(invalidateQuery).toHaveBeenCalledWith("/api/events");
	});

	it("invalidates correct cache key for event.promoted", () => {
		const routes = { "event.promoted": "/api/events" };
		handleSSEEvent("event.promoted", routes);
		expect(invalidateQuery).toHaveBeenCalledWith("/api/events");
	});

	it("invalidates correct cache key for dossier.updated", () => {
		const routes = { "dossier.updated": "/api/dossiers" };
		handleSSEEvent("dossier.updated", routes);
		expect(invalidateQuery).toHaveBeenCalledWith("/api/dossiers");
	});

	it("invalidates correct cache key for ingestion.update", () => {
		const routes = { "ingestion.update": "/api/ingestion" };
		handleSSEEvent("ingestion.update", routes);
		expect(invalidateQuery).toHaveBeenCalledWith("/api/ingestion");
	});

	it("invalidates correct cache key for audit.new", () => {
		const routes = { "audit.new": "/api/audit/logs" };
		handleSSEEvent("audit.new", routes);
		expect(invalidateQuery).toHaveBeenCalledWith("/api/audit/logs");
	});

	it("does nothing for unknown event types", () => {
		const routes = { "known.event": "/api/known" };
		handleSSEEvent("unknown.event", routes);
		expect(invalidateQuery).not.toHaveBeenCalled();
	});

	it("uses custom routes when provided", () => {
		const customRoutes = { "custom.event": "/api/custom" };
		handleSSEEvent("custom.event", customRoutes);
		expect(invalidateQuery).toHaveBeenCalledWith("/api/custom");
	});

	it("invalidates multiple keys for array routes", () => {
		const customRoutes = { "multi.event": ["/api/a", "/api/b"] };
		handleSSEEvent("multi.event", customRoutes);
		expect(invalidateQuery).toHaveBeenCalledWith("/api/a");
		expect(invalidateQuery).toHaveBeenCalledWith("/api/b");
	});
});
