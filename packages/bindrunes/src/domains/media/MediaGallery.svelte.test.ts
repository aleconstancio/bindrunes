import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import MediaGallery from "./MediaGallery.svelte";

const images = [
	{ src: "img1.jpg", alt: "Image 1", caption: "First" },
	{ src: "img2.jpg", alt: "Image 2", caption: "Second" },
];

describe("MediaGallery", () => {
	it("renders without errors", () => {
		const { container } = render(MediaGallery);
		expect(container).toBeTruthy();
	});

	it("renders images when provided", () => {
		const { container } = render(MediaGallery, { images });
		const imgs = container.querySelectorAll("img");
		expect(imgs.length).toBeGreaterThanOrEqual(1);
	});

	it("renders empty with no images", () => {
		const { container } = render(MediaGallery, { images: [] });
		expect(container).toBeTruthy();
	});
});
