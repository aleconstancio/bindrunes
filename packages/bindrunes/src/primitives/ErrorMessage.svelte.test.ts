import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ErrorMessage from "./ErrorMessage.svelte";

describe("ErrorMessage", () => {
	it("renders a p element", () => {
		const { container } = render(ErrorMessage);
		const p = container.querySelector("p");
		expect(p).toBeInTheDocument();
	});

	it("applies destructive text class", () => {
		const { container } = render(ErrorMessage);
		const p = container.querySelector("p");
		expect(p).toHaveClass("text-destructive");
		expect(p).toHaveClass("text-body-sm");
	});

	it("passes id to the p element", () => {
		const { container } = render(ErrorMessage, { props: { id: "email-error" } });
		const p = container.querySelector("#email-error");
		expect(p).toBeInTheDocument();
	});
});
