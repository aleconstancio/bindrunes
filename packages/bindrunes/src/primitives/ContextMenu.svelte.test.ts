import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ContextMenu from "./ContextMenu.svelte";

describe("ContextMenu", () => {
	it("renders without errors", () => {
		const { container } = render(ContextMenu);
		expect(container).toBeTruthy();
	});
});
