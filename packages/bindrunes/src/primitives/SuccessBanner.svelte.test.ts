import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SuccessBanner from "./SuccessBanner.svelte";

describe("SuccessBanner", () => {
	it("renders the root element", () => {
		const { container } = render(SuccessBanner, { props: { children: () => {} } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(SuccessBanner, {
			props: { class: "my-banner", children: () => {} },
		});
		expect(container.firstElementChild?.className).toContain("my-banner");
	});
});
