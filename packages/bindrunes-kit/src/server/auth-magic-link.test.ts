import { describe, expect, it } from "vitest";
import { createMagicLinkAuth } from "./auth-magic-link";

describe("createMagicLinkAuth", () => {
	const auth = createMagicLinkAuth({ issuer: "test-app" });

	it("generates a magic link", async () => {
		const link = await auth.generateLink("user@example.com", "http://localhost:5173");
		expect(link).toContain("token=");
		expect(link).toContain("/auth/magic/verify");
	});

	it("verifies a valid token", async () => {
		const link = await auth.generateLink("user@example.com", "http://localhost:5173");
		const url = new URL(link);
		const token = url.searchParams.get("token")!;

		const session = await auth.verifyLink(token, async (email) => ({
			user: { id: email, email },
			expiresAt: Date.now() + 60000,
		}));
		expect(session).not.toBeNull();
		expect(session?.user.email).toBe("user@example.com");
	});

	it("rejects a forged token with invalid signature", async () => {
		const link = await auth.generateLink("user@example.com", "http://localhost:5173");
		const url = new URL(link);
		const token = url.searchParams.get("token")!;
		const [dataPart] = token.split(".");
		const forgedToken = `${dataPart}.invalidsignature`;

		const session = await auth.verifyLink(forgedToken, async (email) => ({
			user: { id: email, email },
			expiresAt: Date.now() + 60000,
		}));
		expect(session).toBeNull();
	});

	it("rejects an expired token", async () => {
		const shortLivedAuth = createMagicLinkAuth({
			issuer: "test-app",
			expiresIn: -1000,
		});
		const link = await shortLivedAuth.generateLink("user@example.com", "http://localhost:5173");
		const url = new URL(link);
		const token = url.searchParams.get("token")!;

		const session = await shortLivedAuth.verifyLink(token, async (email) => ({
			user: { id: email, email },
			expiresAt: Date.now() + 60000,
		}));
		expect(session).toBeNull();
	});

	it("rejects token with wrong issuer", async () => {
		const auth1 = createMagicLinkAuth({ issuer: "app-a" });
		const auth2 = createMagicLinkAuth({ issuer: "app-b" });
		const link = await auth1.generateLink("user@example.com", "http://localhost:5173");
		const url = new URL(link);
		const token = url.searchParams.get("token")!;

		const session = await auth2.verifyLink(token, async (email) => ({
			user: { id: email, email },
			expiresAt: Date.now() + 60000,
		}));
		expect(session).toBeNull();
	});
});
