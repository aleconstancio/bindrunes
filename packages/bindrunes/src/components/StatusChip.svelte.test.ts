import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import StatusChip from "./StatusChip.svelte";

describe("StatusChip", () => {
	it("renders label text", () => {
		render(StatusChip, { props: { label: "Active" } });
		expect(screen.getByText("Active")).toBeInTheDocument();
	});

	it("success variant sets data-variant", () => {
		const { container } = render(StatusChip, { props: { label: "Online", variant: "success" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "success");
	});

	it("destructive variant sets data-variant", () => {
		const { container } = render(StatusChip, {
			props: { label: "Offline", variant: "destructive" },
		});
		expect(container.firstElementChild).toHaveAttribute("data-variant", "destructive");
	});

	it("info variant sets data-variant", () => {
		const { container } = render(StatusChip, { props: { label: "Info", variant: "info" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "info");
	});

	it("warning variant sets data-variant", () => {
		const { container } = render(StatusChip, { props: { label: "Warning", variant: "warning" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "warning");
	});

	it("neutral variant sets data-variant", () => {
		const { container } = render(StatusChip, { props: { label: "Neutral", variant: "neutral" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "neutral");
	});

	it("renders dot when dot prop is true", () => {
		const { container } = render(StatusChip, { props: { label: "Live", dot: true } });
		const dot = container.querySelector(".led-dot");
		expect(dot).toBeInTheDocument();
	});

	it("adds animate-pulse when animate is true", () => {
		const { container } = render(StatusChip, {
			props: { label: "Live", dot: true, animate: true },
		});
		expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
	});
});
