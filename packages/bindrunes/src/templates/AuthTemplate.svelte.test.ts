import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AuthTemplate from "./AuthTemplate.svelte";

describe("AuthTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(AuthTemplate);
		expect(container).toBeTruthy();
	});
});
