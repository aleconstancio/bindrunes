import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Button from "./Button.svelte";
import ButtonHarness from "./ButtonHarness.svelte";

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

	it("variant primary applies bg-primary class", () => {
		const { container } = render(Button, { variant: "primary" });
		expect(container.querySelector("button")?.className).toContain("bg-primary");
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
});
