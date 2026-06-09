import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import ContentWithImage from "./ContentWithImage.svelte";

describe("ContentWithImage", () => {
	const items = [
		{ title: "Feature One", description: "Description one", image: "/img/1.jpg" },
		{ title: "Feature Two", description: "Description two" },
	];

	it("renders titles", () => {
		render(ContentWithImage, { items });
		expect(screen.getByText("Feature One")).toBeInTheDocument();
		expect(screen.getByText("Feature Two")).toBeInTheDocument();
	});

	it("renders descriptions", () => {
		render(ContentWithImage, { items });
		expect(screen.getByText("Description one")).toBeInTheDocument();
		expect(screen.getByText("Description two")).toBeInTheDocument();
	});

	it("renders images", () => {
		render(ContentWithImage, { items });
		const img = document.querySelector("img");
		expect(img).toHaveAttribute("src", "/img/1.jpg");
	});

	it("applies class prop", () => {
		const { container } = render(ContentWithImage, { items, class: "my-content" });
		expect(container.firstElementChild?.className).toContain("my-content");
	});

	it("renders empty for no items", () => {
		render(ContentWithImage, { items: [] });
		expect(screen.queryByText("Feature One")).not.toBeInTheDocument();
	});
});
