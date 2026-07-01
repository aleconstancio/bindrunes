import type { SchemaDef } from "./db";

export interface PrismaAdapterOptions {
	schema: SchemaDef;
}

export function createPrismaAdapter(options: PrismaAdapterOptions) {
	const { schema } = options;

	return {
		schema,
		modelName: schema.name,

		/**
		 * Generate Prisma model field definitions from a bindrunes schema.
		 */
		toPrismaFields() {
			const fields: Record<string, { type: string; required?: boolean; unique?: boolean }> = {};
			for (const [key, field] of Object.entries(schema.fields)) {
				const prismaType = mapToPrismaType(field.type);
				fields[key] = {
					type: prismaType,
					required: field.required,
					unique: field.unique,
				};
			}
			return fields;
		},

		/**
		 * Create a typed CRUD router that works with a Prisma client instance.
		 */
		createCrudRouter(prisma: unknown, basePath?: string) {
			return {
				routes: {
					GET: `${basePath ?? `/${schema.name}`}`,
					POST: `${basePath ?? `/${schema.name}`}`,
					GET_BY_ID: `${basePath ?? `/${schema.name}`}/[id]`,
					PUT_BY_ID: `${basePath ?? `/${schema.name}`}/[id]`,
					DELETE_BY_ID: `${basePath ?? `/${schema.name}`}/[id]`,
				},
				schema,
				prisma,
			};
		},
	};
}

function mapToPrismaType(fieldType: string): string {
	if (fieldType === "uuid") return "String";
	if (fieldType === "timestamp") return "DateTime";
	if (fieldType === "boolean") return "Boolean";
	if (fieldType === "number") return "Float";
	if (fieldType.startsWith("enum:")) return "String";
	return "String";
}
