import { render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import LandingNav from "./LandingNav.svelte";

vi.mock("./landing-context.svelte", () => ({
	useLanding: vi.fn(() => ({
		billingAnnual: false,
		activeSection: "",
		menuOpen: false,
		setBillingAnnual: vi.fn(),
		setActiveSection: vi.fn(),
		setMenuOpen: vi.fn(),
	})),
}));

const links = [
	{ label: "Features", href: "#features" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Docs", href: "#docs" },
];

describe("LandingNav", () => {
	it("renders a nav element", () => {
		const { container } = render(LandingNav, { links });
		expect(container.querySelector("nav")).not.toBeNull();
	});

	it("renders logo label", () => {
		render(LandingNav, {
			links,
			logo: { href: "/", label: "MyApp" },
		});
		expect(screen.getByText("MyApp")).toBeInTheDocument();
	});

	it("renders logo link with correct href", () => {
		render(LandingNav, {
			links,
			logo: { href: "/home", label: "MyApp" },
		});
		const link = screen.getByText("MyApp").closest("a");
		expect(link).toHaveAttribute("href", "/home");
	});

	it("renders CTA button", () => {
		render(LandingNav, {
			links,
			cta: { label: "Get Started", href: "/signup" },
		});
		expect(screen.getByText("Get Started")).toBeInTheDocument();
	});

	it("renders CTA link with correct href", () => {
		render(LandingNav, {
			links,
			cta: { label: "Sign Up", href: "/register", variant: "primary" },
		});
		const btn = screen.getByText("Sign Up").closest("a");
		expect(btn).toHaveAttribute("href", "/register");
	});

	it("renders mobile menu button", () => {
		render(LandingNav, { links });
		expect(screen.getByLabelText("Menu")).toBeInTheDocument();
	});

	it("applies sticky positioning", () => {
		const { container } = render(LandingNav, { links });
		const nav = container.querySelector("nav");
		expect(nav?.className).toContain("sticky");
	});

	it("nav has border-b class", () => {
		const { container } = render(LandingNav, { links });
		const nav = container.querySelector("nav");
		expect(nav?.className).toContain("border-b");
	});

	it("does not render logo when not provided", () => {
		render(LandingNav, { links });
		expect(screen.queryByText("MyApp")).not.toBeInTheDocument();
	});

	it("does not render CTA when not provided", () => {
		render(LandingNav, { links });
		expect(screen.queryByText("Get Started")).not.toBeInTheDocument();
	});
});
