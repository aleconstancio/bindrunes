import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudEditDrawer from "./CrudEditDrawer.svelte";

describe("CrudEditDrawer", () => {
	const config = {
		title: "Edit User",
		fields: [],
	};

	it("renders without errors", () => {
		const { container } = render(CrudEditDrawer, {
			props: { config, open: true },
		});
		expect(container).toBeTruthy();
	});

	it("renders with default open false", () => {
		const { container } = render(CrudEditDrawer, { props: { config } });
		expect(container).toBeTruthy();
	});

	it("renders with loading state", () => {
		const { container } = render(CrudEditDrawer, {
			props: { config, open: true, loading: true },
		});
		expect(container).toBeTruthy();
	});
});
