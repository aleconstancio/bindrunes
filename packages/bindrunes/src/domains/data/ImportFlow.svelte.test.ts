import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ImportFlow from "./ImportFlow.svelte";

describe("ImportFlow", () => {
	it("renders without errors", () => {
		const { container } = render(ImportFlow, {
			props: { open: true },
		});
		expect(container).toBeTruthy();
	});

	it("renders with default props", () => {
		const { container } = render(ImportFlow, {
			props: { open: true, accept: ".csv,.json" },
		});
		expect(container).toBeTruthy();
	});

	it("renders with loading state", () => {
		const { container } = render(ImportFlow, {
			props: { open: true, loading: true },
		});
		expect(container).toBeTruthy();
	});

	it("renders closed by default", () => {
		const { container } = render(ImportFlow);
		expect(container).toBeTruthy();
	});
});
