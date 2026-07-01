import type { SchemaDef } from "./db";

export interface DrizzleAdapterOptions {
	schema: SchemaDef;
}

export function createDrizzleAdapter(options: DrizzleAdapterOptions) {
	const { schema } = options;

	return {
		schema,
		tableName: schema.name,

		/**
		 * Generate a Drizzle table definition from a bindrunes schema.
		 * Consumers pass this to drizzle-orm's pgTable() or similar.
		 */
		toDrizzleColumns() {
			const columns: Record<string, string> = {};
			for (const [key, field] of Object.entries(schema.fields)) {
				columns[key] = field.type;
			}
			return columns;
		},

		/**
		 * Create a typed CRUD router that works with a Drizzle database instance.
		 */
		createCrudRouter(db: unknown, basePath?: string) {
			return {
				routes: {
					GET: `${basePath ?? `/${schema.name}`}`,
					POST: `${basePath ?? `/${schema.name}`}`,
					GET_BY_ID: `${basePath ?? `/${schema.name}`}/[id]`,
					PUT_BY_ID: `${basePath ?? `/${schema.name}`}/[id]`,
					DELETE_BY_ID: `${basePath ?? `/${schema.name}`}/[id]`,
				},
				schema,
				db,
			};
		},
	};
}
