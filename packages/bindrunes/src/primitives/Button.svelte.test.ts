import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import ButtonHarness from "./__tests__/harness/ButtonHarness.svelte";
import Button from "./Button.svelte";

describe("Button", () => {
	it("renders a button element by default", () => {
		const { container } = render(Button);
		const btn = container.querySelector("button");
		expect(btn).toBeInTheDocument();
	});

	it("renders as anchor when href is given", () => {
		const { container } = render(Button, { href: "/test" });
		const link = container.querySelector("a");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/test");
	});

	it("fires onclick handler on button", async () => {
		const fn = vi.fn();
		const { container } = render(Button, { onclick: fn });
		await userEvent.click(container.querySelector("button")!);
		expect(fn).toHaveBeenCalledOnce();
	});

	it("disabled prevents click", async () => {
		const fn = vi.fn();
		const { container } = render(Button, { disabled: true, onclick: fn });
		await userEvent.click(container.querySelector("button")!);
		expect(fn).not.toHaveBeenCalled();
	});

	it("loading shows spinner", () => {
		const { container } = render(Button, { loading: true });
		expect(container.querySelector(".animate-spin")).toBeInTheDocument();
	});

	it("loading prevents click", async () => {
		const fn = vi.fn();
		const { container } = render(Button, { loading: true, onclick: fn });
		await userEvent.click(container.querySelector("button")!);
		expect(fn).not.toHaveBeenCalled();
	});

	it("variant primary applies button-bg class", () => {
		const { container } = render(Button, { variant: "primary" });
		expect(container.querySelector("button")?.className).toContain("bg-[--button-bg");
	});

	it("variant secondary applies bg-secondary class", () => {
		const { container } = render(Button, { variant: "secondary" });
		expect(container.querySelector("button")?.className).toContain("bg-secondary");
	});

	it("variant outline applies bg-transparent", () => {
		const { container } = render(Button, { variant: "outline" });
		expect(container.querySelector("button")?.className).toContain("bg-transparent");
	});

	it("variant ghost applies bg-transparent class", () => {
		const { container } = render(Button, { variant: "ghost" });
		expect(container.querySelector("button")?.className).toContain("bg-transparent");
	});

	it("variant destructive applies bg-destructive class", () => {
		const { container } = render(Button, { variant: "destructive" });
		expect(container.querySelector("button")?.className).toContain("bg-destructive");
	});

	it("size sm applies h-8 class", () => {
		const { container } = render(Button, { size: "sm" });
		expect(container.querySelector("button")?.className).toContain("h-8");
	});

	it("size lg applies h-12 class", () => {
		const { container } = render(Button, { size: "lg" });
		expect(container.querySelector("button")?.className).toContain("h-12");
	});

	it("fullWidth adds w-full class", () => {
		const { container } = render(Button, { fullWidth: true });
		expect(container.querySelector("button")?.className).toContain("w-full");
	});

	it("renders with data-loading attribute when loading", () => {
		const { container } = render(Button, { loading: true });
		expect(container.querySelector("button")?.getAttribute("data-loading")).toBe("true");
	});

	it("no data-loading when not loading", () => {
		const { container } = render(Button);
		expect(container.querySelector("button")?.getAttribute("data-loading")).toBeNull();
	});

	it("type=submit", () => {
		const { container } = render(Button, { type: "submit" });
		expect(container.querySelector("button")?.getAttribute("type")).toBe("submit");
	});

	it("custom class merged", () => {
		const { container } = render(Button, { class: "my-btn" });
		expect(container.querySelector("button")?.className).toContain("my-btn");
	});

	it("href button renders loading spinner", () => {
		const { container } = render(Button, { href: "/x", loading: true });
		expect(container.querySelector(".animate-spin")).toBeInTheDocument();
	});

	it("a11y: button has no violations", async () => {
		const { container } = render(ButtonHarness, { label: "Click me" });
		await expectNoAxeViolations(container);
	});

	it("a11y: link has no violations", async () => {
		const { container } = render(ButtonHarness, { href: "/x", label: "Go" });
		await expectNoAxeViolations(container);
	});

	it("variant link renders as anchor with underline", () => {
		const { container } = render(Button, { variant: "link", href: "/x" });
		const link = container.querySelector("a");
		expect(link?.className).toContain("underline-offset-4");
	});

	it("variant soft renders with primary/10 background", () => {
		const { container } = render(Button, { variant: "soft" });
		expect(container.querySelector("button")?.className).toContain("bg-primary/10");
	});

	it("variant subtle renders with muted background", () => {
		const { container } = render(Button, { variant: "subtle" });
		expect(container.querySelector("button")?.className).toContain("bg-muted");
	});

	it("size md applies h-10 class", () => {
		const { container } = render(Button, { size: "md" });
		expect(container.querySelector("button")?.className).toContain("h-10");
	});

	it("iconOnly adds aspect-square", () => {
		const { container } = render(Button, { iconOnly: true });
		expect(container.querySelector("button")?.className).toContain("aspect-square");
	});

	it("iconOnly on href adds aspect-square", () => {
		const { container } = render(Button, { href: "/x", iconOnly: true });
		expect(container.querySelector("a")?.className).toContain("aspect-square");
	});

	it("href with fullWidth", () => {
		const { container } = render(Button, { href: "/x", fullWidth: true });
		expect(container.querySelector("a")?.className).toContain("w-full");
	});

	it("href with ariaLabel", () => {
		const { container } = render(Button, { href: "/x", ariaLabel: "Go" });
		expect(container.querySelector("a")?.getAttribute("aria-label")).toBe("Go");
	});

	it("href with loading shows spinner", () => {
		const { container } = render(Button, { href: "/x", loading: true });
		expect(container.querySelector(".animate-spin")).toBeInTheDocument();
	});

	it("type=reset", () => {
		const { container } = render(Button, { type: "reset" });
		expect(container.querySelector("button")?.getAttribute("type")).toBe("reset");
	});

	it("style prop is applied", () => {
		const { container } = render(Button, { style: "color: red" });
		expect(container.querySelector("button")?.getAttribute("style")).toContain("color: red");
	});

	it("href with style prop", () => {
		const { container } = render(Button, { href: "/x", style: "color: blue" });
		expect(container.querySelector("a")?.getAttribute("style")).toContain("color: blue");
	});
});
