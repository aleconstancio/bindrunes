import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Popconfirm from "./Popconfirm.svelte";

describe("Popconfirm", () => {
	it("renders", () => {
		const { container } = render(Popconfirm);
		expect(container).toBeDefined();
	});
});
