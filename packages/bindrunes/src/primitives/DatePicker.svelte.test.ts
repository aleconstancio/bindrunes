import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import DatePicker from "./DatePicker.svelte";

describe("DatePicker", () => {
	it("renders without errors", () => {
		const { container } = render(DatePicker);
		expect(container).toBeTruthy();
	});
});
