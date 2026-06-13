import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import VideoPlayer from "./VideoPlayer.svelte";

describe("VideoPlayer", () => {
	it("renders video element", () => {
		const { container } = render(VideoPlayer, { src: "/test.mp4" });
		const video = container.querySelector("video");
		expect(video).toBeInTheDocument();
		expect(video).toHaveAttribute("src", "/test.mp4");
	});

	it("renders with poster", () => {
		const { container } = render(VideoPlayer, { src: "/test.mp4", poster: "/thumb.jpg" });
		const video = container.querySelector("video");
		expect(video).toHaveAttribute("poster", "/thumb.jpg");
	});

	it("applies class prop", () => {
		const { container } = render(VideoPlayer, { class: "my-video" });
		expect(container.firstElementChild?.className).toContain("my-video");
	});
});
