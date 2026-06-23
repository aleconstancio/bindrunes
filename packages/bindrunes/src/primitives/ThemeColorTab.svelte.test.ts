import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import ThemeColorTab from "./ThemeColorTab.svelte";

describe("ThemeColorTab", () => {
	it("renders all preset buttons", () => {
		render(ThemeColorTab);
		expect(screen.getByText("editorial")).toBeInTheDocument();
		expect(screen.getByText("dracula")).toBeInTheDocument();
		expect(screen.getByText("nord")).toBeInTheDocument();
		expect(screen.getByText("catppuccin")).toBeInTheDocument();
		expect(screen.getByText("rose-pine")).toBeInTheDocument();
		expect(screen.getByText("github")).toBeInTheDocument();
	});

	it("shows the Start from preset label", () => {
		render(ThemeColorTab);
		expect(screen.getByText("Start from preset")).toBeInTheDocument();
	});

	it("shows color labels", () => {
		render(ThemeColorTab);
		expect(screen.getByText("Primary Color")).toBeInTheDocument();
		expect(screen.getByText("Accent Color")).toBeInTheDocument();
		expect(screen.getByText("Destructive Color")).toBeInTheDocument();
	});

	it("shows border radius label", () => {
		render(ThemeColorTab);
		expect(screen.getByText("Border Radius")).toBeInTheDocument();
	});

	it("calls onpreset when a preset button is clicked", async () => {
		const onpreset = vi.fn();
		render(ThemeColorTab, { onpreset });
		await fireEvent.click(screen.getByText("dracula"));
		expect(onpreset).toHaveBeenCalledWith("dracula");
	});

	it("renders color picker inputs", () => {
		const { container } = render(ThemeColorTab);
		const colors = container.querySelectorAll('input[type="color"]');
		expect(colors.length).toBe(3);
	});

	it("uses default color values", () => {
		const { container } = render(ThemeColorTab);
		const inputs = container.querySelectorAll('input[type="color"]');
		expect((inputs[0] as HTMLInputElement).value.toUpperCase()).toBe("#6B8AFF");
		expect((inputs[1] as HTMLInputElement).value.toUpperCase()).toBe("#8A6BFF");
		expect((inputs[2] as HTMLInputElement).value.toUpperCase()).toBe("#FF5555");
	});

	it("highlights the active base theme", () => {
		const { container } = render(ThemeColorTab, { baseTheme: "nord" });
		// All preset buttons rendered; the active one gets variant=primary
		const buttons = container.querySelectorAll("button");
		const nordBtn = Array.from(buttons).find((b) => b.textContent?.trim() === "nord");
		expect(nordBtn?.className).toContain("bg-[--button-bg");
	});
});
