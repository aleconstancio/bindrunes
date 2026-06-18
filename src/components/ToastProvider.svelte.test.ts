import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ToastProvider from "./ToastProvider.svelte";

describe("ToastProvider", () => {
	it("renders without crashing", () => {
		const { container } = render(ToastProvider);
		expect(container).toBeDefined();
	});

	it("does not throw with default props", () => {
		expect(() => render(ToastProvider)).not.toThrow();
	});

	it("does not throw with custom props", () => {
		expect(() =>
			render(ToastProvider, {
				props: { position: "top-center", duration: 3000, visibleToasts: 3 },
			}),
		).not.toThrow();
	});
});
