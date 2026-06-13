import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DynamicIcon from "./DynamicIcon.svelte";

describe("DynamicIcon", () => {
	it("renders nothing when icon is undefined", () => {
		const { container } = render(DynamicIcon, {});
		expect(container.querySelector("span")).toBeNull();
		expect(container.querySelector("svg")).toBeNull();
	});

	it("renders string icon as text", () => {
		render(DynamicIcon, { icon: "\u2665" });
		expect(screen.getByText("\u2665")).toBeInTheDocument();
	});

	it("applies size to string icon", () => {
		const { container } = render(DynamicIcon, { icon: "X", size: 30 });
		const span = container.querySelector("span");
		expect(span).toHaveStyle({ fontSize: "30px" });
	});

	it("applies class to string icon", () => {
		const { container } = render(DynamicIcon, { icon: "X", class: "my-icon" });
		const span = container.querySelector("span");
		expect(span?.className).toContain("my-icon");
	});
});
