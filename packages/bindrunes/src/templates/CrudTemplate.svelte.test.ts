import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudTemplate from "./CrudTemplate.svelte";

describe("CrudTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(CrudTemplate);
		expect(container).toBeTruthy();
	});
});
