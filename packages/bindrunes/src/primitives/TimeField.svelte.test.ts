import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TimeField from "./TimeField.svelte";

describe("TimeField", () => {
	it("renders without errors", () => {
		const { container } = render(TimeField);
		expect(container).toBeTruthy();
	});
});
