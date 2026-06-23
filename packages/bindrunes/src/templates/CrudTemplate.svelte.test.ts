import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudTemplate from "./CrudTemplate.svelte";

const schema = {
	name: "item",
	fields: {
		name: { name: "name", type: "text" },
		email: { name: "email", type: "text" },
	},
};

describe("CrudTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(CrudTemplate, { props: { schema } });
		expect(container).toBeTruthy();
	});

	it("renders empty state by default", () => {
		const { container } = render(CrudTemplate, { props: { schema } });
		expect(container.textContent).toContain("No item yet");
	});

	it("renders custom empty state text", () => {
		const { container } = render(CrudTemplate, {
			props: { schema: { name: "task", fields: {} }, emptyMessage: "Pick something" },
		});
		expect(container.textContent).toContain("Pick something");
	});
});
