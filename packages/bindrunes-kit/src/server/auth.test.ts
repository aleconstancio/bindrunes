import { describe, expect, it } from "vitest";
import { createServerAuth } from "./auth";

describe("createServerAuth", () => {
	it("creates auth with handle function", () => {
		const auth = createServerAuth({ validate: async () => null });
		expect(auth.handle).toBeDefined();
		expect(typeof auth.handle).toBe("function");
	});

	it("getSession returns null when no cookie", async () => {
		const auth = createServerAuth({ validate: async () => null });
		const event = { cookies: { get: () => undefined } } as any;
		const session = await auth.getSession(event);
		expect(session).toBeNull();
	});

	it("setSession sets cookie", async () => {
		const auth = createServerAuth({ validate: async () => null });
		const cookies: Record<string, string> = {};
		const event = {
			cookies: {
				set: (name: string, value: string) => {
					cookies[name] = value;
				},
				get: () => undefined,
				delete: () => {},
			},
		} as any;
		auth.setSession(event, { user: { id: "1", email: "a@b.com" }, expiresAt: Date.now() });
		expect(cookies["bindrunes-session"]).toBeDefined();
	});
});
