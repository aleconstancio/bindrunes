import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CrudFormModal from "./CrudFormModal.svelte";

describe("CrudFormModal", () => {
	const config = {
		title: "User Modal",
		fields: [],
	};

	it("renders without errors", () => {
		const { container } = render(CrudFormModal, { props: { config } });
		expect(container).toBeTruthy();
	});

	it("renders in create mode", () => {
		const { container } = render(CrudFormModal, {
			props: { config, mode: "create" },
		});
		expect(container).toBeTruthy();
	});

	it("renders in edit mode", () => {
		const { container } = render(CrudFormModal, {
			props: { config, mode: "edit" },
		});
		expect(container).toBeTruthy();
	});

	it("renders with loading state", () => {
		const { container } = render(CrudFormModal, {
			props: { config, loading: true },
		});
		expect(container).toBeTruthy();
	});
});
