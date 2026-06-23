import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TabbedSettings from "./TabbedSettings.svelte";

const tabs = [
	{ id: "general", label: "General" },
	{ id: "security", label: "Security" },
];

describe("TabbedSettings", () => {
	it("renders without errors", () => {
		const { container } = render(TabbedSettings, { tabs });
		expect(container).toBeTruthy();
	});

	it("renders tab labels", () => {
		const { getByText } = render(TabbedSettings, { tabs });
		expect(getByText("General")).toBeInTheDocument();
		expect(getByText("Security")).toBeInTheDocument();
	});

	it("renders with empty tabs", () => {
		const { container } = render(TabbedSettings, { tabs: [] });
		expect(container).toBeTruthy();
	});
});
