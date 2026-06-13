import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import NavigationMenu from "../../src/components/NavigationMenu.svelte";

describe("NavigationMenu", () => {
	const links = [
		{ label: "Home", href: "/" },
		{ label: "Features", href: "/features" },
	];

	it("renders all links", () => {
		render(NavigationMenu, { props: { links } });
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Features")).toBeInTheDocument();
	});

	it("renders with empty links", () => {
		const { container } = render(NavigationMenu, { props: { links: [] } });
		expect(container).toBeInTheDocument();
	});

	it("highlights active link", () => {
		const { container } = render(NavigationMenu, {
			props: { links, activeId: "features" },
		});
		expect(container.querySelector('[class*="bg-muted"]')).toBeInTheDocument();
	});
});
