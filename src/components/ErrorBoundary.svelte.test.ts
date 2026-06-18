import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundaryHarness from "./__tests__/harness/ErrorBoundaryHarness.svelte";

describe("ErrorBoundary", () => {
	it("renders slot content when no error", () => {
		const { container } = render(ErrorBoundaryHarness, { text: "Content" });
		expect(container.textContent).toContain("Content");
	});

	it("renders default fallback UI when error fires", async () => {
		const onError = vi.fn();
		const { container } = render(ErrorBoundaryHarness, { text: "Content", onError });
		const err = new Error("Test error");
		window.dispatchEvent(new ErrorEvent("error", { error: err, message: "Test error" }));
		await vi.waitFor(() => {
			expect(container.querySelector("h2")).toBeInTheDocument();
		});
		expect(onError).toHaveBeenCalled();
	});

	it("minimal variant uses compact layout", async () => {
		const { container } = render(ErrorBoundaryHarness, { text: "Content", variant: "minimal" });
		window.dispatchEvent(new ErrorEvent("error", { message: "X" }));
		await vi.waitFor(() => {
			expect(container.querySelector("p")?.textContent).toBe("Something went wrong");
		});
	});

	it("page variant uses h1 and full layout", async () => {
		const { container } = render(ErrorBoundaryHarness, { text: "Content", variant: "page" });
		window.dispatchEvent(new ErrorEvent("error", { message: "X" }));
		await vi.waitFor(() => {
			expect(container.querySelector("h1")).toBeInTheDocument();
		});
	});

	it("custom fallbackTitle and fallbackDescription are shown", async () => {
		const { container } = render(ErrorBoundaryHarness, {
			text: "X",
			fallbackTitle: "Custom title",
			fallbackDescription: "Custom desc",
		});
		window.dispatchEvent(new ErrorEvent("error", { message: "X" }));
		await vi.waitFor(() => {
			expect(container.textContent).toContain("Custom title");
		});
		expect(container.textContent).toContain("Custom desc");
	});

	it("showHome=false hides home button", async () => {
		const { container } = render(ErrorBoundaryHarness, { text: "X", showHome: false });
		window.dispatchEvent(new ErrorEvent("error", { message: "X" }));
		await vi.waitFor(() => {
			expect(container.querySelector("h2")).toBeInTheDocument();
		});
		expect(container.textContent).not.toContain("Home");
	});

	it("showHome=true shows home button with custom url", async () => {
		const { container } = render(ErrorBoundaryHarness, {
			text: "X",
			showHome: true,
			homeUrl: "/dashboard",
		});
		window.dispatchEvent(new ErrorEvent("error", { message: "X" }));
		await vi.waitFor(() => {
			expect(container.textContent).toContain("Home");
		});
		expect(container.querySelector('a[href="/dashboard"]')).toBeInTheDocument();
	});

	it("showRetry=false hides retry button", async () => {
		const { container } = render(ErrorBoundaryHarness, { text: "X", showRetry: false });
		window.dispatchEvent(new ErrorEvent("error", { message: "X" }));
		await vi.waitFor(() => {
			expect(container.querySelector("h2")).toBeInTheDocument();
		});
		expect(container.textContent).not.toContain("Reload");
	});

	it("retry button clears error and calls onRetry", async () => {
		const onRetry = vi.fn();
		const { container } = render(ErrorBoundaryHarness, { text: "Content", onRetry });
		window.dispatchEvent(new ErrorEvent("error", { message: "X" }));
		await vi.waitFor(() => {
			expect(container.querySelector("h2")).toBeInTheDocument();
		});
		const btn = container.querySelector("button")!;
		await fireEvent.click(btn);
		expect(onRetry).toHaveBeenCalled();
		expect(container.textContent).toContain("Content");
	});

	it("error with no event.error uses message", async () => {
		const onError = vi.fn();
		render(ErrorBoundaryHarness, { text: "X", onError });
		window.dispatchEvent(new ErrorEvent("error", { message: "Just a message" }));
		await vi.waitFor(() => {
			expect(onError).toHaveBeenCalled();
		});
	});
});
