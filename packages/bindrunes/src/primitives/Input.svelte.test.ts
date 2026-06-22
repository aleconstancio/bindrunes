import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import Input from "./Input.svelte";

describe("Input", () => {
	it("renders with label", () => {
		render(Input, { props: { label: "Name" } });
		expect(screen.getByText("Name")).toBeInTheDocument();
	});

	it("shows placeholder", () => {
		render(Input, { props: { placeholder: "Enter name" } });
		expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
	});

	it("shows error message", () => {
		render(Input, { props: { error: "Required field" } });
		expect(screen.getByText("Required field")).toBeInTheDocument();
	});

	it("hides helper when error is present", () => {
		render(Input, { props: { helper: "Helper text", error: "Error text" } });
		expect(screen.getByText("Error text")).toBeInTheDocument();
		expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
	});

	it("renders textarea when type is textarea", () => {
		render(Input, { props: { type: "textarea", placeholder: "Bio" } });
		const textarea = screen.getByPlaceholderText("Bio");
		expect(textarea.tagName).toBe("TEXTAREA");
	});

	it("disables input", () => {
		render(Input, { props: { disabled: true, placeholder: "Disabled" } });
		expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
	});

	it("required shows asterisk on label", () => {
		render(Input, { label: "Email", required: true });
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	it("uses custom id when provided", () => {
		const { getByLabelText } = render(Input, {
			props: { label: "Email", id: "custom-id" },
		});
		expect(getByLabelText("Email").id).toBe("custom-id");
	});

	it("a11y: input with name has no violations", async () => {
		const { container } = render(Input, {
			name: "email",
			label: "Email",
			placeholder: "you@x.com",
		});
		await expectNoAxeViolations(container);
	});

	it("a11y: input with error has no violations", async () => {
		const { container } = render(Input, { name: "email", label: "Email", error: "Required" });
		await expectNoAxeViolations(container);
	});

	it("a11y: textarea has no violations", async () => {
		const { container } = render(Input, { type: "textarea", name: "bio", label: "Bio" });
		await expectNoAxeViolations(container);
	});

	it("shows helper text when no error", () => {
		render(Input, { props: { helper: "Helpful hint" } });
		expect(screen.getByText("Helpful hint")).toBeInTheDocument();
	});

	it("does not show helper when error is present", () => {
		render(Input, { props: { error: "Error", helper: "Help" } });
		expect(screen.queryByText("Help")).not.toBeInTheDocument();
	});

	it("renders email type", () => {
		render(Input, { props: { type: "email", placeholder: "Email" } });
		const input = screen.getByPlaceholderText("Email");
		expect(input).toHaveAttribute("type", "email");
	});

	it("renders password type", () => {
		render(Input, { props: { type: "password", placeholder: "Pass" } });
		const input = screen.getByPlaceholderText("Pass");
		expect(input).toHaveAttribute("type", "password");
	});

	it("renders number type", () => {
		render(Input, { props: { type: "number", placeholder: "Num" } });
		const input = screen.getByPlaceholderText("Num");
		expect(input).toHaveAttribute("type", "number");
	});

	it("sets aria-invalid when error present", () => {
		render(Input, { props: { error: "Required" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("aria-invalid")).toBe("true");
	});

	it("does not set aria-invalid without error", () => {
		render(Input);
		const input = document.querySelector("input");
		expect(input?.getAttribute("aria-invalid")).toBeNull();
	});

	it("sets aria-describedby with error", () => {
		render(Input, { props: { id: "my-input", error: "Error" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("aria-describedby")).toBe("my-input-error");
	});

	it("sets aria-describedby with helper", () => {
		render(Input, { props: { id: "my-input", helper: "Help" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("aria-describedby")).toBe("my-input-helper");
	});

	it("does not set aria-describedby without error or helper", () => {
		render(Input);
		const input = document.querySelector("input");
		expect(input?.getAttribute("aria-describedby")).toBeNull();
	});

	it("required shows asterisk on label", () => {
		render(Input, { label: "Email", required: true });
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	it("sets name attribute on input", () => {
		render(Input, { props: { name: "email" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("name")).toBe("email");
	});

	it("sets name attribute on textarea", () => {
		render(Input, { props: { type: "textarea", name: "bio" } });
		const textarea = document.querySelector("textarea");
		expect(textarea?.getAttribute("name")).toBe("bio");
	});

	it("applies error border class", () => {
		render(Input, { props: { error: "Error" } });
		const input = document.querySelector("input");
		expect(input?.className).toContain("border-destructive");
	});

	it("applies default border class without error", () => {
		render(Input);
		const input = document.querySelector("input");
		expect(input?.className).toContain("border-border");
	});

	it("applies disabled class", () => {
		render(Input, { props: { disabled: true } });
		const input = document.querySelector("input");
		expect(input?.className).toContain("disabled:opacity-50");
	});

	it("renders with custom class on input", () => {
		render(Input, { props: { class: "custom-input" } });
		const input = document.querySelector("input");
		expect(input?.className).toContain("custom-input");
	});

	it("renders with custom class on textarea", () => {
		render(Input, { props: { type: "textarea", class: "custom-textarea" } });
		const textarea = document.querySelector("textarea");
		expect(textarea?.className).toContain("custom-textarea");
	});

	it("applies type=date", () => {
		render(Input, { props: { type: "date" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("type")).toBe("date");
	});

	it("applies type=time", () => {
		render(Input, { props: { type: "time" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("type")).toBe("time");
	});

	it("applies type=search", () => {
		render(Input, { props: { type: "search" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("type")).toBe("search");
	});

	it("applies type=tel", () => {
		render(Input, { props: { type: "tel" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("type")).toBe("tel");
	});

	it("applies type=url", () => {
		render(Input, { props: { type: "url" } });
		const input = document.querySelector("input");
		expect(input?.getAttribute("type")).toBe("url");
	});

	it("textarea has 4 rows by default", () => {
		render(Input, { props: { type: "textarea" } });
		const textarea = document.querySelector("textarea");
		expect(textarea?.getAttribute("rows")).toBe("4");
	});
});
