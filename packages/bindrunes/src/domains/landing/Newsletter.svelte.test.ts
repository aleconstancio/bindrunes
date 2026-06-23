import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Newsletter from "./Newsletter.svelte";

describe("Newsletter", () => {
	it("exports a Svelte component", () => {
		expect(Newsletter).toBeDefined();
	});

	it("is a function", () => {
		expect(typeof Newsletter).toBe("function");
	});

	it("renders title", () => {
		const { container } = render(Newsletter, { props: { title: "Subscribe" } });
		expect(container.textContent).toContain("Subscribe");
	});

	it("renders default button text", () => {
		const { container } = render(Newsletter, { props: { title: "X" } });
		expect(container.textContent).toContain("Subscribe");
	});

	it("renders custom button text", () => {
		const { container } = render(Newsletter, { props: { title: "X", buttonText: "Join" } });
		expect(container.textContent).toContain("Join");
	});

	it("renders description when provided", () => {
		const { container } = render(Newsletter, {
			props: { title: "X", description: "Stay updated" },
		});
		expect(container.textContent).toContain("Stay updated");
	});
});
