import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TimeField from "../../src/components/TimeField.svelte";

describe("TimeField", () => {
	it("renders without crashing", () => {
		const { container } = render(TimeField);
		expect(container).toBeInTheDocument();
	});

	it("renders disabled state", () => {
		const { container } = render(TimeField, { props: { disabled: true } });
		expect(container).toBeInTheDocument();
	});
});
