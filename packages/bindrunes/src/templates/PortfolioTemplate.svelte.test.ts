import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import PortfolioTemplate from "./PortfolioTemplate.svelte";

describe("PortfolioTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(PortfolioTemplate);
		expect(container).toBeTruthy();
	});
});
