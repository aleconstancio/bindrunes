import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { Tabs } from "../../src/components/tabs/index";

describe("Tabs", () => {
	it("renders Tabs.Root element", () => {
		const { container } = render(Tabs);
		const root = container.querySelector('[data-orientation="horizontal"]');
		expect(root).toBeInTheDocument();
	});

	it("renders with provided value", () => {
		const { container } = render(Tabs, {
			value: "tab1",
		});
		const root = container.querySelector('[data-orientation="horizontal"]');
		expect(root).toBeInTheDocument();
	});
});
