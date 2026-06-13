import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import FileCard from "./FileCard.svelte";

describe("FileCard", () => {
	it("renders file name", () => {
		render(FileCard, { name: "document.pdf" });
		expect(screen.getByText("document.pdf")).toBeInTheDocument();
	});

	it("renders file size", () => {
		render(FileCard, { name: "doc.pdf", size: "1.2 MB" });
		expect(screen.getByText("1.2 MB")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(FileCard, { name: "doc.pdf", class: "my-file" });
		expect(container.firstElementChild?.className).toContain("my-file");
	});
});
