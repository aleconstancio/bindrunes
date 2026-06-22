import type { SchemaDef } from "./db";

export interface HandlerContext {
	readonly params: Record<string, string>;
	readonly locals: Record<string, unknown>;
	readonly request: Request;
}

export type HandlerFn = (ctx: HandlerContext) => Promise<Response | unknown>;

export interface TypedHandlerOptions {
	readonly validate?: boolean;
}

export function createTypedHandler(
	schema: SchemaDef,
	handler: HandlerFn,
	options?: TypedHandlerOptions,
): HandlerFn {
	return async (ctx: HandlerContext) => {
		if (options?.validate && (ctx.request.method === "POST" || ctx.request.method === "PUT")) {
			try {
				const body = await ctx.request.json();
				const errors = validateBody(body, schema);
				if (errors.length > 0) {
					return new Response(JSON.stringify({ error: "Validation failed", details: errors }), {
						status: 400,
						headers: { "Content-Type": "application/json" },
					});
				}
			} catch {
				return new Response(JSON.stringify({ error: "Invalid JSON" }), {
					status: 400,
					headers: { "Content-Type": "application/json" },
				});
			}
		}

		const result = await handler(ctx);

		if (result instanceof Response) {
			return result;
		}

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	};
}

function validateBody(body: Record<string, unknown>, schema: SchemaDef): string[] {
	const errors: string[] = [];
	for (const [key, def] of Object.entries(schema.fields)) {
		if (def.required && !(key in body)) {
			errors.push(`${key} is required`);
		}
	}
	return errors;
}

export function createJsonResponse(data: unknown, status = 200): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

export function createErrorResponse(message: string, status = 400): Response {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}
