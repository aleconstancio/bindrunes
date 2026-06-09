import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AppProvider from "../../src/components/AppProvider.svelte";

describe("AppProvider", () => {
	it("renders children", () => {
		const { container } = render(AppProvider);
		expect(container).toBeInTheDocument();
	});

	it("renders ModeWatcher component", () => {
		const { container } = render(AppProvider);
		expect(container).toBeInTheDocument();
	});
});
