import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import EcommerceTemplate from "./EcommerceTemplate.svelte";

describe("EcommerceTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(EcommerceTemplate);
		expect(container).toBeTruthy();
	});
});
