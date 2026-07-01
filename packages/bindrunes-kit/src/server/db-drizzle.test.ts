import { describe, expect, it } from "vitest";
import { defineSchema, field } from "./db";
import { createDrizzleAdapter } from "./db-drizzle";

describe("createDrizzleAdapter", () => {
	const schema = defineSchema("users", {
		id: field.uuid().primaryKey(),
		name: field.string().required(),
		email: field.string().email().unique(),
	});

	it("returns schema and tableName", () => {
		const adapter = createDrizzleAdapter({ schema });
		expect(adapter.tableName).toBe("users");
		expect(adapter.schema).toBe(schema);
	});

	it("converts fields to drizzle columns", () => {
		const adapter = createDrizzleAdapter({ schema });
		const columns = adapter.toDrizzleColumns();
		expect(columns.id).toBe("uuid");
		expect(columns.name).toBe("string");
		expect(columns.email).toBe("string");
	});

	it("creates CRUD router with routes", () => {
		const adapter = createDrizzleAdapter({ schema });
		const router = adapter.createCrudRouter({}, "/api/users");
		expect(router.routes.GET).toBe("/api/users");
		expect(router.routes.POST).toBe("/api/users");
		expect(router.routes.GET_BY_ID).toBe("/api/users/[id]");
	});
});
