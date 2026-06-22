// bindrunes-kit/server/db — Schema definition and CRUD router generation.
// Drizzle ORM types are optional — consumers install drizzle-orm themselves.

export interface FieldDef {
	readonly type: string;
	readonly required?: boolean;
	readonly unique?: boolean;
	readonly primaryKey?: boolean;
	readonly default?: unknown;
}

export interface SchemaDef {
	readonly name: string;
	readonly fields: Record<string, FieldDef>;
}

export interface FieldBuilder {
	readonly _type: string;
	readonly _field: FieldDef;
	string(): FieldBuilder;
	number(): FieldBuilder;
	boolean(): FieldBuilder;
	uuid(): FieldBuilder;
	timestamp(): FieldBuilder;
	enum(values: readonly string[]): FieldBuilder;
	email(): FieldBuilder;
	required(): FieldBuilder;
	unique(): FieldBuilder;
	primaryKey(): FieldBuilder;
	default(value: unknown): FieldBuilder;
	toField(): FieldDef;
}

function createFieldBuilder(currentType: string, existing?: FieldDef): FieldBuilder {
	const base: FieldDef = existing ?? { type: currentType };

	const builder: FieldBuilder = {
		get _type() {
			return currentType;
		},
		get _field() {
			return base;
		},
		string: () => createFieldBuilder("string"),
		number: () => createFieldBuilder("number"),
		boolean: () => createFieldBuilder("boolean"),
		uuid: () => createFieldBuilder("uuid"),
		timestamp: () => createFieldBuilder("timestamp"),
		enum: (values) => createFieldBuilder(`enum:${values.join(",")}`),
		email: () => createFieldBuilder("string", { ...base, type: "string" }),
		required: () => createFieldBuilder(currentType, { ...base, required: true }),
		unique: () => createFieldBuilder(currentType, { ...base, unique: true }),
		primaryKey: () => createFieldBuilder(currentType, { ...base, primaryKey: true }),
		default: (v) => createFieldBuilder(currentType, { ...base, default: v }),
		toField: () => base,
	};

	return builder;
}

export const field = {
	string: () => createFieldBuilder("string"),
	number: () => createFieldBuilder("number"),
	boolean: () => createFieldBuilder("boolean"),
	uuid: () => createFieldBuilder("uuid"),
	timestamp: () => createFieldBuilder("timestamp"),
	enum: (values: readonly string[]) => createFieldBuilder(`enum:${values.join(",")}`),
};

export function defineSchema(name: string, fields: Record<string, FieldBuilder>): SchemaDef {
	const resolved: Record<string, FieldDef> = {};
	for (const [key, builder] of Object.entries(fields)) {
		resolved[key] = builder.toField();
	}
	return { name, fields: resolved };
}

export interface CrudRouterOptions {
	readonly schema: SchemaDef;
	readonly db: unknown;
	readonly basePath?: string;
}

export function createCrudRouter(options: CrudRouterOptions) {
	const { schema, basePath = `/${schema.name}` } = options;

	return {
		routes: {
			GET: `${basePath}`,
			POST: `${basePath}`,
			GET_BY_ID: `${basePath}/[id]`,
			PUT_BY_ID: `${basePath}/[id]`,
			DELETE_BY_ID: `${basePath}/[id]`,
		},
		schema,
	};
}
