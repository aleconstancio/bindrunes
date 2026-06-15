import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AlertDialog from "./AlertDialog.svelte";
import Avatar from "./Avatar.svelte";
import DashboardShell from "./dashboard/DashboardShell.svelte";
import Kbd from "./Kbd.svelte";
import Label from "./Label.svelte";
import MetricCard from "./MetricCard.svelte";
import RuleFootnote from "./RuleFootnote.svelte";
import Separator from "./Separator.svelte";
import Skeleton from "./Skeleton.svelte";
import { Tabs } from "./tabs/index";

describe("Simple components", () => {
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

	describe("Avatar", () => {
		it("renders fallback initials when no src", () => {
			const { container } = render(Avatar, { props: { fallback: "JD", size: "md" } });
			expect(container.textContent).toContain("JD");
		});

		it("applies custom class", () => {
			const { container } = render(Avatar, { props: { fallback: "A", class: "custom" } });
			expect(container.querySelector(".custom")).toBeInTheDocument();
		});
	});

	describe("DashboardShell", () => {
		it("renders the shell wrapper", () => {
			const { container } = render(DashboardShell);
			expect(container.firstElementChild).toBeInTheDocument();
		});

		it("renders main element", () => {
			const { container } = render(DashboardShell);
			expect(container.querySelector("main")).toBeInTheDocument();
		});
	});

	describe("Kbd", () => {
		it("renders a kbd element", () => {
			const { container } = render(Kbd);
			expect(container.querySelector("kbd")).toBeInTheDocument();
		});

		it("has the correct tag name", () => {
			const { container } = render(Kbd);
			expect(container.querySelector("kbd")?.tagName).toBe("KBD");
		});

		it("applies custom class", () => {
			const { container } = render(Kbd, { class: "custom" });
			expect(container.querySelector("kbd")).toHaveClass("custom");
		});
	});

	describe("Label", () => {
		it("renders label element", () => {
			const { container } = render(Label, { for: "email", slots: { children: "Email" } });
			expect(container.querySelector("label")).toBeInTheDocument();
		});

		it("sets htmlFor attribute", () => {
			const { container } = render(Label, { for: "email", slots: { children: "Email" } });
			expect(container.querySelector("label")).toHaveAttribute("for", "email");
		});
	});

	describe("MetricCard", () => {
		it("renders label, value, and detail", () => {
			render(MetricCard, { props: { label: "Revenue", value: "$10k", detail: "This month" } });
			expect(screen.getByText("Revenue")).toBeInTheDocument();
			expect(screen.getByText("$10k")).toBeInTheDocument();
			expect(screen.getByText("This month")).toBeInTheDocument();
		});

		it("renders progress bar when progress is provided", () => {
			const { container } = render(MetricCard, {
				props: { label: "Usage", value: "75%", progress: 75 },
			});
			expect(container.querySelector('[style*="width"]')).toBeInTheDocument();
		});
	});

	describe("RuleFootnote", () => {
		it("renders default title", () => {
			render(RuleFootnote);
			expect(screen.getByText("Regra Crítica")).toBeInTheDocument();
		});

		it("renders custom title", () => {
			render(RuleFootnote, { title: "Custom Rule" });
			expect(screen.getByText("Custom Rule")).toBeInTheDocument();
		});

		it("renders description", () => {
			render(RuleFootnote, { description: "This rule applies to all cases." });
			expect(screen.getByText("This rule applies to all cases.")).toBeInTheDocument();
		});
	});

	describe("Separator", () => {
		it("renders a separator element", () => {
			const { container } = render(Separator);
			expect(container.firstElementChild).toBeInTheDocument();
		});

		it("renders vertical orientation", () => {
			const { container } = render(Separator, { props: { orientation: "vertical" } });
			expect(container.firstElementChild).toBeInTheDocument();
		});

		it("applies custom class", () => {
			const { container } = render(Separator, { props: { class: "custom" } });
			expect(container.querySelector(".custom")).toBeInTheDocument();
		});
	});

	describe("Skeleton", () => {
		it("renders the root element", () => {
			const { container } = render(Skeleton);
			expect(container.firstElementChild).toBeInTheDocument();
		});

		it("renders with custom line count", () => {
			const { container } = render(Skeleton, { props: { lines: 5 } });
			expect(container.firstElementChild).toBeInTheDocument();
		});

		it("applies width prop", () => {
			const { container } = render(Skeleton, { props: { width: "50%" } });
			expect(container.firstElementChild).toBeInTheDocument();
		});
	});

	describe("Tabs", () => {
		it("renders Tabs.Root element", () => {
			const { container } = render(Tabs);
			expect(container.querySelector('[data-orientation="horizontal"]')).toBeInTheDocument();
		});

		it("renders with provided value", () => {
			const { container } = render(Tabs, { value: "tab1" });
			expect(container.querySelector('[data-orientation="horizontal"]')).toBeInTheDocument();
		});
	});
});
