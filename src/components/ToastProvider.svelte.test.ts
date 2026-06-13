import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ToastProvider from "./ToastProvider.svelte";

describe("ToastProvider", () => {
	it("renders without crashing", () => {
		const { container } = render(ToastProvider);
		expect(container).toBeDefined();
	});

	it("renders with custom position", () => {
		const { container } = render(ToastProvider, { position: "top-left" });
		expect(container).toBeDefined();
	});

	it("renders with custom duration", () => {
		const { container } = render(ToastProvider, { duration: 5000 });
		expect(container).toBeDefined();
	});
});
