import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Suspense from "./Suspense.svelte";

describe("Suspense", () => {
	it("shows loading state by default", () => {
		render(Suspense, {
			state: { status: "loading" },
		});
		const spinner = document.querySelector(".animate-spin");
		expect(spinner).toBeInTheDocument();
	});

	it("shows empty state with reload button", () => {
		render(Suspense, {
			state: { status: "empty" },
		});
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("shows error state with reload button", () => {
		render(Suspense, {
			state: { status: "error", error: new Error("Oops") },
		});
		expect(screen.getByRole("button")).toBeInTheDocument();
	});
});
