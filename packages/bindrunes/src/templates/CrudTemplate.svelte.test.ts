import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudTemplate from "./CrudTemplate.svelte";

describe("CrudTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(CrudTemplate);
		expect(container).toBeTruthy();
	});

	it("renders empty state by default", () => {
		const { container } = render(CrudTemplate);
		expect(container.textContent).toContain("Select an item");
	});

	it("renders custom empty state text", () => {
		const { container } = render(CrudTemplate, {
			props: { emptyTitle: "Nothing selected", emptyDescription: "Pick something" },
		});
		expect(container.textContent).toContain("Nothing selected");
		expect(container.textContent).toContain("Pick something");
	});

	it("applies class prop", () => {
		const { container } = render(CrudTemplate, { props: { class: "crud-class" } });
		expect(container.firstElementChild?.className).toContain("crud-class");
	});
});
