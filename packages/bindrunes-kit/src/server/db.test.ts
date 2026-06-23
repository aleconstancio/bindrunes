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

	it("number field", () => {
		const f = field.number();
		expect(f._type).toBe("number");
	});

	it("boolean field", () => {
		const f = field.boolean();
		expect(f._type).toBe("boolean");
	});

	it("uuid field with primaryKey", () => {
		const f = field.uuid().primaryKey();
		expect(f._field.primaryKey).toBe(true);
	});

	it("timestamp field", () => {
		const f = field.timestamp();
		expect(f._type).toBe("timestamp");
	});

	it("enum field", () => {
		const f = field.enum(["admin", "user"]);
		expect(f._type).toContain("enum");
	});

	it("enum field preserves values in type", () => {
		const f = field.enum(["a", "b", "c"]);
		expect(f._type).toBe("enum:a,b,c");
	});

	it("email sets type to string", () => {
		const f = field.string().email();
		expect(f._type).toBe("string");
	});

	it("required sets required flag", () => {
		const f = field.string().required();
		expect(f._field.required).toBe(true);
	});

	it("unique sets unique flag", () => {
		const f = field.string().unique();
		expect(f._field.unique).toBe(true);
	});

	it("default sets default value", () => {
		const f = field.number().default(42);
		expect(f._field.default).toBe(42);
	});

	it("chaining preserves flags across type changes", () => {
		const f = field.string().required().unique().default("hello");
		const def = f.toField();
		expect(def.type).toBe("string");
		expect(def.required).toBe(true);
		expect(def.unique).toBe(true);
		expect(def.default).toBe("hello");
	});

	it("toField returns FieldDef", () => {
		const f = field.string().required().unique();
		const def = f.toField();
		expect(def.type).toBe("string");
		expect(def.required).toBe(true);
		expect(def.unique).toBe(true);
	});

	it("uuid default field", () => {
		const f = field.uuid();
		expect(f._type).toBe("uuid");
		expect(f._field).toEqual({ type: "uuid" });
	});

	it("boolean with required", () => {
		const f = field.boolean().required();
		expect(f._field.required).toBe(true);
		expect(f._field.type).toBe("boolean");
	});

	it("timestamp with default", () => {
		const f = field.timestamp().default("now");
		expect(f._field.default).toBe("now");
	});

	it("email preserves other flags", () => {
		const f = field.string().required().unique().email();
		const def = f.toField();
		expect(def.type).toBe("string");
		expect(def.required).toBe(true);
		expect(def.unique).toBe(true);
	});

	it("multiple defaults only keeps last", () => {
		const f = field.number().default(1).default(2);
		expect(f._field.default).toBe(2);
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
