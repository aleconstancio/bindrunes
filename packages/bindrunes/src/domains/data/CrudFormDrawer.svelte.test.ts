import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudFormDrawer from "./CrudFormDrawer.svelte";

describe("CrudFormDrawer", () => {
	const config = {
		title: "User Form",
		fields: [],
	};

	it("renders without errors", () => {
		const { container } = render(CrudFormDrawer, {
			props: { config, open: true },
		});
		expect(container).toBeTruthy();
	});

	it("renders in create mode", () => {
		const { container } = render(CrudFormDrawer, {
			props: { config, open: true, mode: "create" },
		});
		expect(container).toBeTruthy();
	});

	it("renders in edit mode", () => {
		const { container } = render(CrudFormDrawer, {
			props: { config, open: true, mode: "edit" },
		});
		expect(container).toBeTruthy();
	});

	it("renders with loading state", () => {
		const { container } = render(CrudFormDrawer, {
			props: { config, open: true, loading: true },
		});
		expect(container).toBeTruthy();
	});
});
