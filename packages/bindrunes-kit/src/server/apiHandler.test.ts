import { describe, expect, it } from "vitest";
import { createErrorResponse, createJsonResponse, createTypedHandler } from "./apiHandler";
import { defineSchema, field } from "./db";

const users = defineSchema("users", {
	id: field.uuid().primaryKey(),
	name: field.string().required(),
	email: field.string().email().required(),
});

describe("createTypedHandler", () => {
	it("wraps handler and returns JSON", async () => {
		const handler = createTypedHandler(users, async () => {
			return { id: "1", name: "Alice" };
		});

		const response = (await handler({
			params: {},
			locals: {},
			request: new Request("http://localhost/users", { method: "GET" }),
		})) as Response;

		expect(response).toBeInstanceOf(Response);
		const body = await response.json();
		expect(body).toEqual({ id: "1", name: "Alice" });
	});

	it("validates required fields on POST", async () => {
		const handler = createTypedHandler(users, async () => ({ id: "1" }), { validate: true });

		const response = (await handler({
			params: {},
			locals: {},
			request: new Request("http://localhost/users", {
				method: "POST",
				body: JSON.stringify({ name: "Alice" }), // missing email
				headers: { "Content-Type": "application/json" },
			}),
		})) as Response;

		expect(response.status).toBe(400);
		const body = await response.json();
		expect(body.error).toBe("Validation failed");
		expect(body.details).toContain("email is required");
	});

	it("passes through Response objects", async () => {
		const handler = createTypedHandler(users, async () => {
			return createJsonResponse({ ok: true }, 201);
		});

		const response = (await handler({
			params: {},
			locals: {},
			request: new Request("http://localhost/users", { method: "GET" }),
		})) as Response;

		expect(response.status).toBe(201);
	});
});

describe("createJsonResponse", () => {
	it("creates a JSON response", () => {
		const response = createJsonResponse({ hello: "world" });
		expect(response.headers.get("Content-Type")).toBe("application/json");
	});

	it("accepts custom status", () => {
		const response = createJsonResponse({ ok: true }, 201);
		expect(response.status).toBe(201);
	});
});

describe("createErrorResponse", () => {
	it("creates an error response", () => {
		const response = createErrorResponse("Not found", 404);
		expect(response.status).toBe(404);
	});
});
