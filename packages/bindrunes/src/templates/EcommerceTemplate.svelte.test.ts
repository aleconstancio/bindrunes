import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import EcommerceTemplate from "./EcommerceTemplate.svelte";

describe("EcommerceTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(EcommerceTemplate);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		const { container } = render(EcommerceTemplate);
		expect(container.textContent).toContain("Shop");
	});

	it("renders custom title", () => {
		const { container } = render(EcommerceTemplate, { props: { title: "Store" } });
		expect(container.textContent).toContain("Store");
	});

	it("applies class prop", () => {
		const { container } = render(EcommerceTemplate, { props: { class: "shop-class" } });
		expect(container.firstElementChild?.className).toContain("shop-class");
	});
});
