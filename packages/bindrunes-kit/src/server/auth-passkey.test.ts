import { describe, expect, it } from "vitest";
import { createPasskeyAuth } from "./auth-passkey";

describe("createPasskeyAuth", () => {
	const auth = createPasskeyAuth({
		rpName: "My App",
		origin: "http://localhost:5173",
	});

	it("has rpName and rpId", () => {
		expect(auth.rpName).toBe("My App");
		expect(auth.rpId).toBe("localhost");
	});

	it("generates registration options", async () => {
		const options = await auth.generateRegistrationOptions({
			userId: "user-1",
			email: "test@example.com",
		});
		expect(options).toHaveProperty("rp");
		expect(options).toHaveProperty("user");
		expect(options).toHaveProperty("challenge");
	});

	it("generates authentication options", async () => {
		const options = await auth.generateAuthenticationOptions(["cred-1", "cred-2"]);
		expect(options).toHaveProperty("challenge");
		expect(options).toHaveProperty("allowCredentials");
	});
});
