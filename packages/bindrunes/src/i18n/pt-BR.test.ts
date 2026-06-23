import { describe, expect, it } from "vitest";
import ptBR from "./pt-BR";

describe("i18n/pt-BR", () => {
	it("exports a non-empty dictionary", () => {
		expect(typeof ptBR).toBe("object");
		expect(Object.keys(ptBR).length).toBeGreaterThan(0);
	});

	it("has expected common keys", () => {
		expect(ptBR["common.reload"]).toBe("Recarregar");
		expect(ptBR["common.loading"]).toBe("Carregando");
		expect(ptBR["common.save"]).toBe("Salvar");
		expect(ptBR["common.search"]).toBe("Pesquisar");
		expect(ptBR["common.home"]).toBe("Início");
		expect(ptBR["common.logout"]).toBe("Sair");
	});

	it("has expected form keys", () => {
		expect(ptBR["form.Form.submit"]).toBe("Salvar");
		expect(ptBR["form.Form.success"]).toBe("Salvo com sucesso!");
	});

	it("has expected error keys", () => {
		expect(ptBR["error.ErrorBoundary.title"]).toBe("Algo deu errado");
		expect(ptBR["error.ErrorBoundary.retry"]).toBe("Recarregar");
	});

	it("has expected theme keys", () => {
		expect(ptBR["theme.ThemeToggle.light"]).toBe("Modo Claro");
		expect(ptBR["theme.ThemeToggle.dark"]).toBe("Modo Escuro");
	});

	it("has expected dashboard keys", () => {
		expect(ptBR["dashboard.RuleFootnote.title"]).toBe("Regra Crítica");
		expect(ptBR["dashboard.DashboardShell.defaultTitle"]).toBe("Início");
	});

	it("has same keys as en dictionary", async () => {
		const { default: en } = await import("./en");
		const enKeys = Object.keys(en).sort();
		const ptKeys = Object.keys(ptBR).sort();
		expect(ptKeys).toEqual(enKeys);
	});

	it("all values are strings", () => {
		for (const [_key, value] of Object.entries(ptBR)) {
			expect(typeof value).toBe("string");
		}
	});
});
