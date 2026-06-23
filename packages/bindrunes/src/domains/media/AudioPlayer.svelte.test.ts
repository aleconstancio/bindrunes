import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AudioPlayer from "./AudioPlayer.svelte";

describe("AudioPlayer", () => {
	it("renders without errors", () => {
		const { container } = render(AudioPlayer);
		expect(container).toBeTruthy();
	});

	it("renders title when provided", () => {
		render(AudioPlayer, { title: "My Song" });
		expect(screen.getByText("My Song")).toBeInTheDocument();
	});

	it("renders artist when provided", () => {
		render(AudioPlayer, { artist: "Artist Name" });
		expect(screen.getByText("Artist Name")).toBeInTheDocument();
	});

	it("renders play button", () => {
		render(AudioPlayer);
		expect(screen.getByRole("button")).toBeTruthy();
	});

	it("renders audio element with src", () => {
		const { container } = render(AudioPlayer, { src: "test.mp3" });
		const audio = container.querySelector("audio");
		expect(audio).toBeTruthy();
	});
});
