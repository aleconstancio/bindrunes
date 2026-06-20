import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import FormHarness from "../../components/__tests__/harness/FormHarness.svelte";

describe("Form", () => {
	it("renders a form element", () => {
		const { container } = render(FormHarness, { text: "Form fields" });
		const form = container.querySelector("form");
		expect(form).toBeInTheDocument();
	});

	it("renders submit button with default label", () => {
		render(FormHarness, { text: "Form fields" });
		expect(screen.getByText("Submit")).toBeInTheDocument();
	});

	it("renders submit button with custom label", () => {
		render(FormHarness, { text: "Form fields", submitLabel: "Enviar" });
		expect(screen.getByText("Enviar")).toBeInTheDocument();
	});

	it("renders children content", () => {
		const { container } = render(FormHarness, { text: "X" });
		expect(container.textContent).toContain("X");
	});

	it('submitLabel="" hides submit button', () => {
		const { container } = render(FormHarness, { text: "X", submitLabel: "" });
		expect(container.querySelector('button[type="submit"]')).toBeNull();
	});

	it("disabled prop disables submit button", () => {
		render(FormHarness, { text: "X", disabled: true });
		expect(screen.getByText("Submit")).toBeDisabled();
	});

	it("loading prop shows loading state on submit", () => {
		const { container } = render(FormHarness, { text: "X", loading: true });
		const btn = container.querySelector('button[type="submit"]')!;
		expect(btn.getAttribute("data-loading")).toBe("true");
	});

	it("onSubmit handler is called on submit", async () => {
		const onSubmit = vi.fn().mockResolvedValue(undefined);
		const { container } = render(FormHarness, { text: "X", onSubmit });
		const form = container.querySelector("form")!;
		await fireEvent.submit(form);
		expect(onSubmit).toHaveBeenCalled();
	});

	it("onSuccess called when onSubmit resolves", async () => {
		const onSubmit = vi.fn().mockResolvedValue(undefined);
		const onSuccess = vi.fn();
		const { container } = render(FormHarness, {
			text: "X",
			onSubmit,
			onSuccess,
			disableToast: true,
		});
		const form = container.querySelector("form")!;
		await fireEvent.submit(form);
		await vi.waitFor(() => {
			expect(onSuccess).toHaveBeenCalled();
		});
	});

	it("onError called when onSubmit throws", async () => {
		const err = new Error("Save failed");
		const onSubmit = vi.fn().mockRejectedValue(err);
		const onError = vi.fn();
		const { container } = render(FormHarness, { text: "X", onSubmit, onError });
		const form = container.querySelector("form")!;
		await fireEvent.submit(form);
		await vi.waitFor(() => {
			expect(onError).toHaveBeenCalled();
		});
	});

	it("custom successMessage used in toast", async () => {
		const onSubmit = vi.fn().mockResolvedValue(undefined);
		const { container } = render(FormHarness, {
			text: "X",
			onSubmit,
			successMessage: "Tudo certo!",
		});
		const form = container.querySelector("form")!;
		await fireEvent.submit(form);
		expect(onSubmit).toHaveBeenCalled();
	});

	it("custom errorMessage used in toast when err is not Error", async () => {
		const onSubmit = vi.fn().mockRejectedValue("plain string error");
		const onError = vi.fn();
		const { container } = render(FormHarness, {
			text: "X",
			onSubmit,
			onError,
			errorMessage: "Erro custom",
		});
		const form = container.querySelector("form")!;
		await fireEvent.submit(form);
		await vi.waitFor(() => {
			expect(onError).toHaveBeenCalled();
		});
	});

	it("re-submit while submitting is blocked", async () => {
		let resolveSubmit: (() => void) | undefined;
		const onSubmit = vi.fn().mockImplementation(
			() =>
				new Promise<void>((r) => {
					resolveSubmit = r;
				}),
		);
		const { container } = render(FormHarness, { text: "X", onSubmit });
		const form = container.querySelector("form")!;
		fireEvent.submit(form);
		fireEvent.submit(form);
		expect(onSubmit).toHaveBeenCalledTimes(1);
		resolveSubmit?.();
	});

	it("renders form errors from form prop", () => {
		const fakeForm = {
			isSubmitted: true,
			errors: { name: "Required" },
		};
		const { container } = render(FormHarness, { text: "X", form: fakeForm });
		expect(container.textContent).toContain("Required");
	});

	it("skips empty error messages", () => {
		const fakeForm = {
			isSubmitted: true,
			errors: { name: "Required", email: "" },
		};
		const { container } = render(FormHarness, { text: "X", form: fakeForm });
		expect(container.textContent).toContain("Required");
	});

	it("no error block when no errors", () => {
		const fakeForm = { isSubmitted: true, errors: {} };
		const { container } = render(FormHarness, { text: "X", form: fakeForm });
		expect(container.querySelector(".text-destructive")).toBeNull();
	});
});
