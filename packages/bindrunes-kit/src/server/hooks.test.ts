import { describe, expect, it, vi } from "vitest";
import { createAuthGuard, createCsrfGuard } from "./hooks";

describe("createAuthGuard", () => {
	it("creates a handle function", () => {
		const handle = createAuthGuard();
		expect(typeof handle).toBe("function");
	});
});

describe("createCsrfGuard", () => {
	it("creates a handle function", () => {
		const handle = createCsrfGuard(["http://localhost:3000"]);
		expect(typeof handle).toBe("function");
	});

	it("allows GET requests", async () => {
		const handle = createCsrfGuard(["http://localhost:3000"]);
		const event = { request: { method: "GET" } } as any;
		const resolve = vi.fn().mockResolvedValue(new Response("ok"));
		await handle({ event, resolve } as any);
		expect(resolve).toHaveBeenCalled();
	});
});
