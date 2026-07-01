import { describe, expect, it } from "vitest";
import { createMagicLinkAuth } from "./auth-magic-link";

describe("createMagicLinkAuth", () => {
	const auth = createMagicLinkAuth({ issuer: "test-app" });

	it("generates a magic link", () => {
		const link = auth.generateLink("user@example.com", "http://localhost:5173");
		expect(link).toContain("token=");
		expect(link).toContain("/auth/magic/verify");
	});

	it("verifies a valid token", async () => {
		const link = auth.generateLink("user@example.com", "http://localhost:5173");
		const url = new URL(link);
		const token = url.searchParams.get("token")!;

		const session = await auth.verifyLink(token, async (email) => ({
			user: { id: email, email },
			expiresAt: Date.now() + 60000,
		}));
		expect(session).not.toBeNull();
		expect(session?.user.email).toBe("user@example.com");
	});

	it("rejects an expired token", async () => {
		const payload = {
			email: "user@example.com",
			expiresAt: Date.now() - 1000,
			issuer: "test-app",
		};
		const token = btoa(JSON.stringify(payload));

		const session = await auth.verifyLink(token, async (email) => ({
			user: { id: email, email },
			expiresAt: Date.now() + 60000,
		}));
		expect(session).toBeNull();
	});
});
