import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ProfileSettings from "./ProfileSettings.svelte";

describe("ProfileSettings", () => {
	it("renders without errors", () => {
		const { container } = render(ProfileSettings);
		expect(container).toBeTruthy();
	});

	it("renders profile heading", () => {
		render(ProfileSettings);
		expect(screen.getByText("Profile")).toBeInTheDocument();
	});

	it("renders save button", () => {
		render(ProfileSettings);
		expect(screen.getByText("Save changes")).toBeInTheDocument();
	});

	it("renders change avatar button when onChangeAvatar provided", () => {
		render(ProfileSettings, { onChangeAvatar: () => {} });
		expect(screen.getByText("Change avatar")).toBeInTheDocument();
	});

	it("does not render change avatar button without callback", () => {
		render(ProfileSettings);
		expect(screen.queryByText("Change avatar")).not.toBeInTheDocument();
	});

	it("renders error message when provided", () => {
		render(ProfileSettings, { error: "Something went wrong" });
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
	});
});
