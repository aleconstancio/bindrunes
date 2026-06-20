import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import MediaTemplate from "./MediaTemplate.svelte";

describe("MediaTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(MediaTemplate);
		expect(container).toBeTruthy();
	});
});
