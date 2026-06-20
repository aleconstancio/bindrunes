import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createServerApiClient } from "./api";

let fetchSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
	fetchSpy = vi.spyOn(globalThis, "fetch");
});

afterEach(() => {
	fetchSpy.mockRestore();
});

function jsonResponse(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

function mockEvent(session: any = null) {
	return {
		locals: { session },
	} as any;
}

describe("createServerApiClient", () => {
	describe("basic HTTP methods", () => {
		it("GET request returns parsed JSON", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ name: "Alice" }));
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });
			const result = await api.get<{ name: string }>("/users/1");

			expect(fetchSpy).toHaveBeenCalledWith(
				"https://api.example.com/users/1",
				expect.objectContaining({ headers: expect.anything() }),
			);
			expect(result).toEqual({ name: "Alice" });
		});

		it("POST request sends body", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ id: "1" }));
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });
			await api.post("/users", { name: "Alice" });

			expect(fetchSpy).toHaveBeenCalledWith(
				"https://api.example.com/users",
				expect.objectContaining({
					method: "POST",
					body: JSON.stringify({ name: "Alice" }),
				}),
			);
		});

		it("PUT request sends body", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });
			await api.put("/users/1", { name: "Bob" });

			expect(fetchSpy).toHaveBeenCalledWith(
				"https://api.example.com/users/1",
				expect.objectContaining({
					method: "PUT",
					body: JSON.stringify({ name: "Bob" }),
				}),
			);
		});

		it("PATCH request sends body", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });
			await api.patch("/users/1", { name: "Charlie" });

			expect(fetchSpy).toHaveBeenCalledWith(
				"https://api.example.com/users/1",
				expect.objectContaining({
					method: "PATCH",
					body: JSON.stringify({ name: "Charlie" }),
				}),
			);
		});

		it("DELETE request", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });
			await api.delete("/users/1");

			expect(fetchSpy).toHaveBeenCalledWith(
				"https://api.example.com/users/1",
				expect.objectContaining({ method: "DELETE" }),
			);
		});
	});

	describe("auth forwarding", () => {
		it("adds Authorization header when auth=true and session exists", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({
				baseUrl: "https://api.example.com",
				auth: true,
			});
			const event = mockEvent({ user: { id: "uid123" } });
			await api.get("/me", event);

			expect(fetchSpy).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					headers: expect.objectContaining({
						Authorization: "Bearer uid123",
					}),
				}),
			);
		});

		it("does not add Authorization when no session", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({
				baseUrl: "https://api.example.com",
				auth: true,
			});
			const event = mockEvent(null);
			await api.get("/me", event);

			const headers = fetchSpy.mock.calls[0][1]?.headers as Record<string, string>;
			expect(headers?.Authorization).toBeUndefined();
		});

		it("does not add Authorization when auth=false", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({
				baseUrl: "https://api.example.com",
				auth: false,
			});
			const event = mockEvent({ user: { id: "uid123" } });
			await api.get("/me", event);

			const headers = fetchSpy.mock.calls[0][1]?.headers as Record<string, string>;
			expect(headers?.Authorization).toBeUndefined();
		});
	});

	describe("custom headers", () => {
		it("includes static headers", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({
				baseUrl: "https://api.example.com",
				headers: { "X-Custom": "value" },
			});
			await api.get("/data");

			const headers = fetchSpy.mock.calls[0][1]?.headers as Record<string, string>;
			expect(headers["X-Custom"]).toBe("value");
		});

		it("sets Content-Type for POST with body", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });
			await api.post("/data", { key: "value" });

			const headers = fetchSpy.mock.calls[0][1]?.headers as Record<string, string>;
			expect(headers["Content-Type"]).toBe("application/json");
		});

		it("does not overwrite explicit Content-Type", async () => {
			fetchSpy.mockResolvedValueOnce(jsonResponse({ ok: true }));
			const api = createServerApiClient({
				baseUrl: "https://api.example.com",
				headers: { "Content-Type": "text/plain" },
			});
			await api.post("/upload", "raw");

			const headers = fetchSpy.mock.calls[0][1]?.headers as Record<string, string>;
			expect(headers["Content-Type"]).toBe("text/plain");
		});
	});

	describe("error handling", () => {
		it("throws on non-ok response", async () => {
			fetchSpy.mockResolvedValueOnce(
				new Response("not found", { status: 404, statusText: "Not Found" }),
			);
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });

			await expect(api.get("/missing")).rejects.toThrow("API error: 404 Not Found");
		});

		it("calls onError callback", async () => {
			fetchSpy.mockResolvedValueOnce(
				new Response("err", { status: 500, statusText: "Internal Server Error" }),
			);
			const onError = vi.fn();
			const api = createServerApiClient({
				baseUrl: "https://api.example.com",
				onError,
			});

			await expect(api.get("/fail")).rejects.toThrow();
			expect(onError).toHaveBeenCalledWith(expect.any(Error));
		});

		it("throws on fetch network error", async () => {
			fetchSpy.mockRejectedValueOnce(new TypeError("fetch failed"));
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });

			await expect(api.get("/down")).rejects.toThrow();
		});

		it("calls onError on network error", async () => {
			fetchSpy.mockRejectedValueOnce(new TypeError("fetch failed"));
			const onError = vi.fn();
			const api = createServerApiClient({
				baseUrl: "https://api.example.com",
				onError,
			});

			await expect(api.get("/down")).rejects.toThrow();
			expect(onError).toHaveBeenCalled();
		});
	});

	describe("empty response", () => {
		it("returns undefined for empty body", async () => {
			fetchSpy.mockResolvedValueOnce(new Response("", { status: 204 }));
			const api = createServerApiClient({ baseUrl: "https://api.example.com" });
			const result = await api.get("/void");

			expect(result).toBeUndefined();
		});
	});
});
