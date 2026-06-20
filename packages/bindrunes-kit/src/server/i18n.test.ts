import { describe, expect, it, vi } from "vitest";
import { createServerI18n } from "./i18n";

function mockEvent(pathname = "/", opts: { cookie?: string; acceptLanguage?: string } = {}) {
	const headers = new Headers();
	if (opts.acceptLanguage) {
		headers.set("accept-language", opts.acceptLanguage);
	}
	return {
		url: new URL(`http://localhost${pathname}`),
		cookies: {
			get: (_name: string) => opts.cookie,
		},
		request: {
			headers,
		},
		locals: {},
	} as any;
}

function resolveOk() {
	return vi.fn().mockResolvedValue(new Response("ok"));
}

describe("createServerI18n", () => {
	describe("detectLocale — path strategy", () => {
		it("extracts locale from path", () => {
			const i18n = createServerI18n({
				locales: ["en", "de", "fr"],
				defaultLocale: "en",
				strategy: "path",
			});
			const event = mockEvent("/de/about");
			expect(i18n.detectLocale(event)).toBe("de");
		});

		it("returns default for unknown locale in path", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "path",
			});
			const event = mockEvent("/xx/about");
			expect(i18n.detectLocale(event)).toBe("en");
		});

		it("returns default for no locale in path", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "path",
			});
			const event = mockEvent("/about");
			expect(i18n.detectLocale(event)).toBe("en");
		});

		it("supports region-style locale", () => {
			const i18n = createServerI18n({
				locales: ["en-GB", "en"],
				defaultLocale: "en",
				strategy: "path",
			});
			const event = mockEvent("/en-GB/contact");
			expect(i18n.detectLocale(event)).toBe("en-GB");
		});
	});

	describe("detectLocale — cookie strategy", () => {
		it("reads locale from cookie", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "cookie",
			});
			const event = mockEvent("/", { cookie: "de" });
			expect(i18n.detectLocale(event)).toBe("de");
		});

		it("returns default when cookie not in locales", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "cookie",
			});
			const event = mockEvent("/", { cookie: "fr" });
			expect(i18n.detectLocale(event)).toBe("en");
		});

		it("returns default when no cookie", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "cookie",
			});
			const event = mockEvent("/");
			expect(i18n.detectLocale(event)).toBe("en");
		});
	});

	describe("detectLocale — header strategy", () => {
		it("reads locale from accept-language header", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "header",
			});
			const event = mockEvent("/", { acceptLanguage: "de-DE,de;q=0.9,en;q=0.8" });
			expect(i18n.detectLocale(event)).toBe("de");
		});

		it("returns default when header locale not in locales", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "header",
			});
			const event = mockEvent("/", { acceptLanguage: "fr-FR,fr;q=0.9" });
			expect(i18n.detectLocale(event)).toBe("en");
		});

		it("returns default when no accept-language header", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "header",
			});
			const event = mockEvent("/");
			expect(i18n.detectLocale(event)).toBe("en");
		});
	});

	describe("getPathLocale", () => {
		it("returns locale from path", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
			});
			expect(i18n.getPathLocale("/de/about")).toBe("de");
		});

		it("returns null for no locale prefix", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
			});
			expect(i18n.getPathLocale("/about")).toBeNull();
		});

		it("returns null for unknown locale", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
			});
			expect(i18n.getPathLocale("/fr/about")).toBeNull();
		});

		it("handles region-style locale", () => {
			const i18n = createServerI18n({
				locales: ["en-GB"],
				defaultLocale: "en",
			});
			expect(i18n.getPathLocale("/en-GB/about")).toBe("en-GB");
		});
	});

	describe("handle", () => {
		it("sets locale and pathLocale on event.locals", async () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "path",
			});
			const event = mockEvent("/de/about");
			const resolve = resolveOk();
			await i18n.handle({ event, resolve } as any);

			expect(event.locals.locale).toBe("de");
			expect(event.locals.pathLocale).toBe("de");
		});

		it("sets default locale when no path prefix", async () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
				strategy: "path",
			});
			const event = mockEvent("/about");
			const resolve = resolveOk();
			await i18n.handle({ event, resolve } as any);

			expect(event.locals.locale).toBe("en");
			expect(event.locals.pathLocale).toBeNull();
		});

		it("calls resolve", async () => {
			const i18n = createServerI18n({
				locales: ["en"],
				defaultLocale: "en",
			});
			const event = mockEvent("/");
			const resolve = resolveOk();
			await i18n.handle({ event, resolve } as any);

			expect(resolve).toHaveBeenCalledWith(event);
		});
	});

	describe("defaults", () => {
		it("uses path strategy by default", () => {
			const i18n = createServerI18n({
				locales: ["en", "de"],
				defaultLocale: "en",
			});
			const event = mockEvent("/de/about");
			expect(i18n.detectLocale(event)).toBe("de");
		});
	});
});
