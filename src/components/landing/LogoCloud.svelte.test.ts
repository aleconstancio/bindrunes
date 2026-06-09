import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import LogoCloud from "./LogoCloud.svelte";

const logos = [
	{ label: "Acme" },
	{ label: "Globex" },
	{ label: "Initech", href: "https://initech.example" },
];

describe("LogoCloud", () => {
	it("renders the section", () => {
		const { container } = render(LogoCloud, { logos });
		expect(container.firstElementChild?.className).toContain("section-reveal");
	});

	it("renders title when provided", () => {
		render(LogoCloud, { logos, title: "Trusted by" });
		expect(screen.getByText("Trusted by")).toBeInTheDocument();
	});

	it("does not render title element when missing", () => {
		const { container } = render(LogoCloud, { logos });
		expect(container.querySelector("p.text-label-md")).toBeNull();
	});

	it("renders logo labels", () => {
		render(LogoCloud, { logos });
		expect(screen.getByText("Acme")).toBeInTheDocument();
		expect(screen.getByText("Globex")).toBeInTheDocument();
		expect(screen.getByText("Initech")).toBeInTheDocument();
	});

	it("renders link for logos with href", () => {
		const { container } = render(LogoCloud, { logos });
		const link = container.querySelector('a[href="https://initech.example"]');
		expect(link).not.toBeNull();
		expect(link?.getAttribute("aria-label")).toBe("Initech");
	});

	it("renders div for logos without href", () => {
		const { container } = render(LogoCloud, { logos });
		const acmeLabel = container.querySelector('[aria-label="Acme"]');
		expect(acmeLabel?.tagName).toBe("DIV");
	});

	it("sets aria-label on each logo", () => {
		const { container } = render(LogoCloud, { logos });
		expect(container.querySelector('[aria-label="Acme"]')).not.toBeNull();
		expect(container.querySelector('[aria-label="Globex"]')).not.toBeNull();
		expect(container.querySelector('[aria-label="Initech"]')).not.toBeNull();
	});

	it("applies class prop", () => {
		const { container } = render(LogoCloud, { logos, class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});
});
