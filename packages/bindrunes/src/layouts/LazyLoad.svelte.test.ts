import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import LazyLoad from "./LazyLoad.svelte";

describe("LazyLoad", () => {
	it("renders without crashing", () => {
		const { container } = render(LazyLoad);
		expect(container).toBeTruthy();
	});

	it("has content in the container", () => {
		const { container } = render(LazyLoad);
		expect(container.innerHTML.length).toBeGreaterThan(0);
	});

	it("renders text loading type by default", () => {
		const { container } = render(LazyLoad, { type: "text" });
		expect(container.innerHTML.length).toBeGreaterThan(0);
	});

	it("renders cards loading type", () => {
		const { container } = render(LazyLoad, { type: "cards" });
		expect(container.innerHTML.length).toBeGreaterThan(0);
	});

	it("renders table loading type", () => {
		const { container } = render(LazyLoad, { type: "table" });
		expect(container.innerHTML.length).toBeGreaterThan(0);
	});

	it("passes loadingLines to text type", () => {
		const { container } = render(LazyLoad, { type: "text", loadingLines: 5 });
		expect(container.innerHTML.length).toBeGreaterThan(0);
	});

	it("passes loadingRows to cards type", () => {
		const { container } = render(LazyLoad, { type: "cards", loadingRows: 4 });
		expect(container.innerHTML.length).toBeGreaterThan(0);
	});

	it("passes loadingRows to table type", () => {
		const { container } = render(LazyLoad, { type: "table", loadingRows: 2 });
		expect(container.innerHTML.length).toBeGreaterThan(0);
	});
});
