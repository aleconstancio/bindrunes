import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import CardHarness from "./__tests__/harness/CardHarness.svelte";
import Card from "./Card.svelte";

describe("Card", () => {
	it("renders without crashing", () => {
		const { container } = render(Card);
		const el = container.firstElementChild!;
		expect(el).toBeInTheDocument();
	});

	it("surface variant applies correct classes", () => {
		const { container } = render(Card, { variant: "surface" });
		const el = container.firstElementChild!;
		expect(el.className).toContain("bg-card");
		expect(el.className).toContain("shadow-sm");
	});

	it("glass variant applies backdrop-blur", () => {
		const { container } = render(Card, { variant: "glass" });
		expect(container.firstElementChild?.className).toContain("backdrop-blur");
	});

	it("outlined variant applies bg-transparent", () => {
		const { container } = render(Card, { variant: "outlined" });
		expect(container.firstElementChild?.className).toContain("bg-transparent");
	});

	it("ghost variant applies bg-transparent", () => {
		const { container } = render(Card, { variant: "ghost" });
		expect(container.firstElementChild?.className).toContain("bg-transparent");
	});

	it("custom class is merged", () => {
		const { container } = render(Card, { class: "my-custom-class" });
		expect(container.firstElementChild?.className).toContain("my-custom-class");
	});

	it("padding=false removes padding class", () => {
		const { container } = render(Card, { padding: false });
		expect(container.firstElementChild?.className).not.toContain(" p-[");
	});

	it("href renders an anchor", () => {
		const { container } = render(Card, { href: "/page" });
		const el = container.firstElementChild!;
		expect(el.tagName).toBe("A");
		expect(el.getAttribute("href")).toBe("/page");
	});

	it("href card still applies variant classes", () => {
		const { container } = render(Card, { href: "/p", variant: "outlined" });
		expect(container.firstElementChild?.className).toContain("bg-transparent");
	});

	it("interactive adds role=button and tabindex=0", () => {
		const { container } = render(Card, { interactive: true });
		const el = container.firstElementChild!;
		expect(el.getAttribute("role")).toBe("button");
		expect(el.getAttribute("tabindex")).toBe("0");
	});

	it("interactive adds card-interactive class", () => {
		const { container } = render(Card, { interactive: true });
		expect(container.firstElementChild?.className).toContain("card-interactive");
	});

	it("interactive fires onclick on click", async () => {
		const onClick = vi.fn();
		const { container } = render(Card, { interactive: true, onclick: onClick });
		await fireEvent.click(container.firstElementChild!);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("interactive fires onclick on Enter key", async () => {
		const onClick = vi.fn();
		const { container } = render(Card, { interactive: true, onclick: onClick });
		await fireEvent.keyDown(container.firstElementChild!, { key: "Enter" });
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("interactive fires onclick on Space key", async () => {
		const onClick = vi.fn();
		const { container } = render(Card, { interactive: true, onclick: onClick });
		await fireEvent.keyDown(container.firstElementChild!, { key: " " });
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("non-interactive does not fire onclick", async () => {
		const onClick = vi.fn();
		const { container } = render(Card, { onclick: onClick });
		await fireEvent.click(container.firstElementChild!);
		expect(onClick).not.toHaveBeenCalled();
	});

	it("header snippet renders", () => {
		const { container } = render(CardHarness, { headerText: "HEADER" });
		expect(container.textContent).toContain("HEADER");
	});

	it("footer snippet renders", () => {
		const { container } = render(CardHarness, { footerText: "FOOTER" });
		expect(container.textContent).toContain("FOOTER");
	});

	it("children snippet renders", () => {
		const { container } = render(CardHarness, { childrenText: "BODY" });
		expect(container.textContent).toContain("BODY");
	});

	it("href with interactive and ariaLabel", () => {
		const { container } = render(Card, { href: "/x", interactive: true, ariaLabel: "Card link" });
		const el = container.firstElementChild!;
		expect(el.getAttribute("aria-label")).toBe("Card link");
	});

	it("href without interactive does not set ariaLabel", () => {
		const { container } = render(Card, { href: "/x", ariaLabel: "Card link" });
		const el = container.firstElementChild!;
		expect(el.getAttribute("aria-label")).toBeNull();
	});

	it("interactive with href renders anchor", () => {
		const { container } = render(Card, { href: "/x", interactive: true });
		const el = container.firstElementChild!;
		expect(el.tagName).toBe("A");
	});

	it("interactive with href sets aria-label", () => {
		const { container } = render(Card, { href: "/x", interactive: true, ariaLabel: "Link" });
		const el = container.firstElementChild!;
		expect(el.getAttribute("aria-label")).toBe("Link");
	});

	it("non-interactive without href does not set role", () => {
		const { container } = render(Card);
		const el = container.firstElementChild!;
		expect(el.getAttribute("role")).toBeNull();
	});

	it("non-interactive without href does not set tabindex", () => {
		const { container } = render(Card);
		const el = container.firstElementChild!;
		expect(el.getAttribute("tabindex")).toBeNull();
	});

	it("non-interactive does not set onclick", () => {
		const { container } = render(Card);
		const el = container.firstElementChild!;
		expect(el.getAttribute("onclick")).toBeNull();
	});

	it("padding=true adds padding", () => {
		const { container } = render(Card, { padding: true });
		expect(container.firstElementChild?.className).toContain("p-[");
	});

	it("href card does not have role=button", () => {
		const { container } = render(Card, { href: "/x" });
		expect(container.firstElementChild?.getAttribute("role")).toBeNull();
	});

	it("href card does not have tabindex", () => {
		const { container } = render(Card, { href: "/x" });
		expect(container.firstElementChild?.getAttribute("tabindex")).toBeNull();
	});
});
