import { describe, expect, it } from "vitest";
import { defineSchema, field } from "./db";
import { createPrismaAdapter } from "./db-prisma";

describe("createPrismaAdapter", () => {
	const schema = defineSchema("posts", {
		id: field.uuid().primaryKey(),
		title: field.string().required(),
		published: field.boolean().default(false),
	});

	it("returns schema and modelName", () => {
		const adapter = createPrismaAdapter({ schema });
		expect(adapter.modelName).toBe("posts");
		expect(adapter.schema).toBe(schema);
	});

	it("converts fields to prisma fields", () => {
		const adapter = createPrismaAdapter({ schema });
		const fields = adapter.toPrismaFields();
		expect(fields.id.type).toBe("String");
		expect(fields.title.type).toBe("String");
		expect(fields.title.required).toBe(true);
		expect(fields.published.type).toBe("Boolean");
	});

	it("creates CRUD router", () => {
		const adapter = createPrismaAdapter({ schema });
		const router = adapter.createCrudRouter({});
		expect(router.routes.GET).toBe("/posts");
	});
});
