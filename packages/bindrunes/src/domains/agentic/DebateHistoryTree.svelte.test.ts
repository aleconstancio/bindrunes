import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DebateHistoryTree from "./DebateHistoryTree.svelte";

describe("DebateHistoryTree", () => {
	it("renders empty state when no debate text", () => {
		const { getByText } = render(DebateHistoryTree, {
			props: { debateText: "" },
		});
		expect(getByText(/indisponível/)).toBeTruthy();
	});

	it("renders analyst turns", () => {
		const { getAllByText } = render(DebateHistoryTree, {
			props: {
				debateText:
					"[Analista - Turno 1] Tipo: Classificação, Confiança: 0.85, Justificativa: Test content",
			},
		});
		expect(getAllByText(/Analista/).length).toBeGreaterThanOrEqual(2);
	});

	it("renders critic turns", () => {
		const { getAllByText } = render(DebateHistoryTree, {
			props: {
				debateText: "[Crítico - Turno 1] Aprovado: true, Detalhes: Looks good",
			},
		});
		expect(getAllByText(/Crítico/).length).toBeGreaterThanOrEqual(2);
	});

	it("applies class prop", () => {
		const { container } = render(DebateHistoryTree, {
			props: { debateText: "", class: "my-class" },
		});
		expect(container.firstElementChild?.className).toContain("my-class");
	});
});
