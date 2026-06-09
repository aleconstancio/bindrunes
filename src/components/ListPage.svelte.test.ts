import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ListPage from "./ListPage.svelte";

describe("ListPage", () => {
	it("renders", () => {
		const { container } = render(ListPage);
		expect(container).toBeDefined();
	});
});
