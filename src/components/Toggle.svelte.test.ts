import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Toggle from "../../src/components/Toggle.svelte";

describe("Toggle", () => {
	it("renders without crashing", () => {
		const { container } = render(Toggle);
		expect(container).toBeInTheDocument();
	});

	it("renders disabled state", () => {
		const { container } = render(Toggle, { props: { disabled: true } });
		expect(container).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(Toggle, { props: { class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});

	it("toggles data-state on click", async () => {
		const { container } = render(Toggle);
		const root = container.querySelector("[data-state]")!;
		expect(root.getAttribute("data-state")).toBe("off");
		await fireEvent.click(root);
		expect(root.getAttribute("data-state")).toBe("on");
	});

	it("toggles back to off on second click", async () => {
		const { container } = render(Toggle);
		const root = container.querySelector("[data-state]")!;
		expect(root.getAttribute("data-state")).toBe("off");
		await fireEvent.click(root);
		expect(root.getAttribute("data-state")).toBe("on");
		await fireEvent.click(root);
		expect(root.getAttribute("data-state")).toBe("off");
	});
});
