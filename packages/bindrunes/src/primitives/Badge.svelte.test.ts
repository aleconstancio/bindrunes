import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import Badge from "./Badge.svelte";

describe("Badge", () => {
	it("renders the root element", () => {
		const { container } = render(Badge);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("default variant sets data-variant", () => {
		const { container } = render(Badge);
		expect(container.firstElementChild).toHaveAttribute("data-variant", "default");
	});

	it("primary variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "primary" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "primary");
	});

	it("secondary variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "secondary" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "secondary");
	});

	it("success variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "success" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "success");
	});

	it("warning variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "warning" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "warning");
	});

	it("destructive variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "destructive" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "destructive");
	});

	it("sets data-size attribute", () => {
		const { container } = render(Badge, { props: { size: "lg" } });
		expect(container.firstElementChild).toHaveAttribute("data-size", "lg");
	});

	it("info variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "info" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "info");
	});

	it("outline variant sets data-variant", () => {
		const { container } = render(Badge, { props: { variant: "outline" } });
		expect(container.firstElementChild).toHaveAttribute("data-variant", "outline");
	});

	it("renders removable button when removable is true", () => {
		render(Badge, { props: { removable: true } });
		expect(screen.getByLabelText("Remove")).toBeInTheDocument();
	});

	it("does not render remove button by default", () => {
		render(Badge);
		expect(screen.queryByLabelText("Remove")).not.toBeInTheDocument();
	});

	it("remove button calls onRemove", async () => {
		const onRemove = vi.fn();
		render(Badge, { props: { removable: true, onRemove } });
		await fireEvent.click(screen.getByLabelText("Remove"));
		expect(onRemove).toHaveBeenCalled();
	});

	it("size sm sets data-size", () => {
		const { container } = render(Badge, { props: { size: "sm" } });
		expect(container.firstElementChild).toHaveAttribute("data-size", "sm");
	});

	it("size md sets data-size", () => {
		const { container } = render(Badge, { props: { size: "md" } });
		expect(container.firstElementChild).toHaveAttribute("data-size", "md");
	});

	it("applies custom class", () => {
		const { container } = render(Badge, { props: { class: "my-badge" } });
		expect(container.firstElementChild?.className).toContain("my-badge");
	});
});
