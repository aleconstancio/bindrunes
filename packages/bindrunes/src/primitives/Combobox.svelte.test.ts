import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Combobox from "./Combobox.svelte";

describe("Combobox", () => {
	it("renders without errors", () => {
		const { container } = render(Combobox);
		expect(container).toBeTruthy();
	});
});
