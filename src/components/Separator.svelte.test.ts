import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Separator from "../../src/components/Separator.svelte";

describe("Separator", () => {
	it("renders without crashing", () => {
		const { container } = render(Separator);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders vertical orientation", () => {
		const { container } = render(Separator, { props: { orientation: "vertical" } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(Separator, { props: { class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});
});
