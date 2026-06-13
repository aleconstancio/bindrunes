import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AlertDialog from "./AlertDialog.svelte";

describe("AlertDialog", () => {
	it("does not render when open=false", () => {
		render(AlertDialog, { open: false });
		expect(screen.queryAllByRole("dialog").length).toBe(0);
	});

	it("exports a Svelte component", () => {
		expect(AlertDialog).toBeDefined();
		expect(typeof AlertDialog).toBe("function");
	});
});
