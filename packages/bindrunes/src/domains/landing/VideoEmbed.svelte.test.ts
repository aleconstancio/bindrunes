import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import VideoEmbed from "./VideoEmbed.svelte";

describe("VideoEmbed", () => {
	it("renders without errors", () => {
		const { container } = render(VideoEmbed);
		expect(container).toBeTruthy();
	});

	it("renders title when provided", () => {
		const { getByText } = render(VideoEmbed, { title: "Demo Video" });
		expect(getByText("Demo Video")).toBeInTheDocument();
	});

	it("renders description when provided", () => {
		const { getByText } = render(VideoEmbed, { description: "Watch this" });
		expect(getByText("Watch this")).toBeInTheDocument();
	});

	it("renders video element when videoUrl provided", () => {
		const { container } = render(VideoEmbed, { videoUrl: "test.mp4" });
		expect(container.querySelector("video")).toBeTruthy();
	});

	it("renders poster as fallback when no videoUrl", () => {
		const { container } = render(VideoEmbed, { posterUrl: "poster.jpg" });
		const img = container.querySelector("img");
		expect(img).toBeTruthy();
	});
});
