import { describe, expect, it } from "vitest";
import { createCrudRouter, defineSchema, field } from "./db";

describe("defineSchema", () => {
	it("creates a schema definition", () => {
		const users = defineSchema("users", {
			id: field.uuid().primaryKey(),
			name: field.string().required(),
			email: field.string().email().unique(),
		});

		expect(users.name).toBe("users");
		expect(users.fields.id.type).toBe("uuid");
		expect(users.fields.id.primaryKey).toBe(true);
		expect(users.fields.name.type).toBe("string");
		expect(users.fields.name.required).toBe(true);
	});
});

describe("field builders", () => {
	it("string field", () => {
		const f = field.string();
		expect(f._type).toBe("string");
	});

	it("uuid field with primaryKey", () => {
		const f = field.uuid().primaryKey();
		expect(f._field.primaryKey).toBe(true);
	});

	it("enum field", () => {
		const f = field.enum(["admin", "user"]);
		expect(f._type).toContain("enum");
	});

	it("toField returns FieldDef", () => {
		const f = field.string().required().unique();
		const def = f.toField();
		expect(def.type).toBe("string");
		expect(def.required).toBe(true);
		expect(def.unique).toBe(true);
	});
});

describe("createCrudRouter", () => {
	it("generates REST routes from schema", () => {
		const users = defineSchema("users", {
			id: field.uuid().primaryKey(),
			name: field.string().required(),
		});

		const router = createCrudRouter({ schema: users, db: {} });

		expect(router.routes.GET).toBe("/users");
		expect(router.routes.POST).toBe("/users");
		expect(router.routes.GET_BY_ID).toBe("/users/[id]");
		expect(router.routes.PUT_BY_ID).toBe("/users/[id]");
		expect(router.routes.DELETE_BY_ID).toBe("/users/[id]");
	});

	it("accepts custom basePath", () => {
		const users = defineSchema("users", { id: field.uuid().primaryKey() });
		const router = createCrudRouter({ schema: users, db: {}, basePath: "/api/v1/users" });

		expect(router.routes.GET).toBe("/api/v1/users");
	});
});
