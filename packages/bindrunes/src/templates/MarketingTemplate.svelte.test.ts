import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import MarketingTemplate from "./MarketingTemplate.svelte";

describe("MarketingTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(MarketingTemplate);
		expect(container).toBeTruthy();
	});
});
