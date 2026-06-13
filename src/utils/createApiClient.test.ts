import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApiClient } from "../utils/createApiClient";

describe("createApiClient", () => {
	const mockFetch = vi.fn();
	const getToken = vi.fn().mockReturnValue("test-token");

	beforeEach(() => {
		vi.clearAllMocks();
		vi.stubGlobal("fetch", mockFetch);
	});

	const okJsonResponse = (status = 200, body: unknown = {}) => ({
		ok: true,
		status,
		headers: new Headers({ "content-type": "application/json" }),
		json: () => Promise.resolve(body),
	});

	it("sends GET request with correct headers", async () => {
		mockFetch.mockResolvedValue(okJsonResponse(200, { result: "ok" }));
		const client = createApiClient({ getToken, baseUrl: "/api" });
		const result = await client.get("/users");
		expect(mockFetch).toHaveBeenCalled();
		const [url, opts] = mockFetch.mock.calls[0];
		expect(url).toBe("/api/users");
		expect(opts.method).toBe("GET");
		expect(opts.headers.get("Authorization")).toBe("Bearer test-token");
		expect(result).toEqual({ result: "ok" });
	});

	it("sends POST request with JSON body", async () => {
		mockFetch.mockResolvedValue(okJsonResponse(201, { id: 1 }));
		const client = createApiClient({ getToken, baseUrl: "/api" });
		const result = await client.post("/users", { name: "Alice" });
		expect(mockFetch).toHaveBeenCalled();
		const [url, opts] = mockFetch.mock.calls[0];
		expect(url).toBe("/api/users");
		expect(opts.method).toBe("POST");
		expect(opts.body).toBe(JSON.stringify({ name: "Alice" }));
		expect(result).toEqual({ id: 1 });
	});

	it("sends PUT request", async () => {
		mockFetch.mockResolvedValue(okJsonResponse());
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await client.put("/users/1", { name: "Bob" });
		const [url, opts] = mockFetch.mock.calls[0];
		expect(url).toBe("/api/users/1");
		expect(opts.method).toBe("PUT");
	});

	it("sends PATCH request", async () => {
		mockFetch.mockResolvedValue(okJsonResponse());
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await client.patch("/users/1", { name: "B" });
		const [, opts] = mockFetch.mock.calls[0];
		expect(opts.method).toBe("PATCH");
	});

	it("sends DELETE request", async () => {
		mockFetch.mockResolvedValue(okJsonResponse(204, {}));
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await client.delete("/items/1");
		const [url, opts] = mockFetch.mock.calls[0];
		expect(url).toBe("/api/items/1");
		expect(opts.method).toBe("DELETE");
	});

	it("uploads file with FormData", async () => {
		mockFetch.mockResolvedValue(okJsonResponse(200, { ok: true }));
		const client = createApiClient({ getToken, baseUrl: "/api" });
		const file = new File(["content"], "test.txt", { type: "text/plain" });
		await client.upload("/upload", file, { category: "docs" });
		const [, opts] = mockFetch.mock.calls[0];
		expect(opts.body).toBeInstanceOf(FormData);
		expect(opts.method).toBe("POST");
	});

	it("throws on non-ok response with custom message", async () => {
		mockFetch.mockResolvedValue({
			ok: false,
			status: 404,
			headers: new Headers({ "content-type": "application/json" }),
			json: () => Promise.resolve({ message: "Not found" }),
		});
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await expect(client.get("/missing")).rejects.toThrow("Not found");
	});

	it("throws on non-ok response with fallback message", async () => {
		mockFetch.mockResolvedValue({
			ok: false,
			status: 500,
			headers: new Headers(),
			json: () => Promise.reject(new Error("parse fail")),
		});
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await expect(client.get("/x")).rejects.toThrow("HTTP 500");
	});

	it("uses errorData.code when message missing", async () => {
		mockFetch.mockResolvedValue({
			ok: false,
			status: 422,
			headers: new Headers({ "content-type": "application/json" }),
			json: () => Promise.resolve({ code: "INVALID_INPUT" }),
		});
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await expect(client.post("/x", {})).rejects.toThrow("INVALID_INPUT");
	});

	it("handles 401 and calls onUnauthorized", async () => {
		mockFetch.mockResolvedValue({ ok: false, status: 401, headers: new Headers() });
		const onUnauthorized = vi.fn();
		const client = createApiClient({ getToken, baseUrl: "/api", onUnauthorized });
		await expect(client.get("/x")).rejects.toThrow("Unauthorized");
		expect(onUnauthorized).toHaveBeenCalled();
	});

	it("calls onError on non-ok response", async () => {
		mockFetch.mockResolvedValue({
			ok: false,
			status: 500,
			headers: new Headers({ "content-type": "application/json" }),
			json: () => Promise.resolve({ message: "Server error" }),
		});
		const onError = vi.fn();
		const client = createApiClient({ getToken, baseUrl: "/api", onError });
		await expect(client.get("/x")).rejects.toThrow();
		expect(onError).toHaveBeenCalled();
	});

	it("handles 204 No Content", async () => {
		mockFetch.mockResolvedValue({ ok: true, status: 204, headers: new Headers() });
		const client = createApiClient({ getToken, baseUrl: "/api" });
		const result = await client.delete("/items/1");
		expect(result).toEqual({});
	});

	it("appends query params to GET requests", async () => {
		mockFetch.mockResolvedValue(okJsonResponse(200, []));
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await client.get("/users", { page: "1", limit: "10" });
		const calledUrl = mockFetch.mock.calls[0][0];
		expect(calledUrl).toContain("page=1");
		expect(calledUrl).toContain("limit=10");
	});

	it("omits query string when no params", async () => {
		mockFetch.mockResolvedValue(okJsonResponse());
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await client.get("/users");
		expect(mockFetch.mock.calls[0][0]).toBe("/api/users");
	});

	it("omits Authorization header when getToken returns null", async () => {
		mockFetch.mockResolvedValue(okJsonResponse());
		const client = createApiClient({ getToken: () => null, baseUrl: "/api" });
		await client.get("/public");
		const headers = mockFetch.mock.calls[0][1].headers;
		expect(headers).not.toHaveProperty("Authorization");
	});

	it("omits Content-Type when body is FormData", async () => {
		mockFetch.mockResolvedValue(okJsonResponse());
		const client = createApiClient({ getToken, baseUrl: "/api" });
		const file = new File(["x"], "a.txt");
		await client.upload("/u", file);
		const headers = mockFetch.mock.calls[0][1].headers;
		expect(headers.get("Content-Type")).toBeNull();
	});

	it("sets Content-Type to application/json when body provided", async () => {
		mockFetch.mockResolvedValue(okJsonResponse());
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await client.post("/x", { a: 1 });
		const headers = mockFetch.mock.calls[0][1].headers;
		expect(headers.get("Content-Type")).toBe("application/json");
	});

	it("uses credentials: same-origin", async () => {
		mockFetch.mockResolvedValue(okJsonResponse());
		const client = createApiClient({ getToken, baseUrl: "/api" });
		await client.get("/x");
		expect(mockFetch.mock.calls[0][1].credentials).toBe("same-origin");
	});

	it("merges domainApis onto the client", async () => {
		const customApi = { listItems: vi.fn().mockResolvedValue([{ id: 1 }]) };
		const client = createApiClient({ getToken, baseUrl: "/api" }, customApi);
		expect((client as any).listItems).toBe(customApi.listItems);
		expect((client as any).listItems).toBeDefined();
	});

	it("works with empty domainApis", async () => {
		mockFetch.mockResolvedValue(okJsonResponse());
		const client = createApiClient({ getToken, baseUrl: "/api" });
		expect(client.get).toBeDefined();
	});
});
