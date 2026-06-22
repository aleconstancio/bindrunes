import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import MediaTemplate from "./MediaTemplate.svelte";

describe("MediaTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(MediaTemplate);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		const { container } = render(MediaTemplate);
		expect(container.textContent).toContain("Media");
	});

	it("renders custom title", () => {
		const { container } = render(MediaTemplate, { props: { title: "Gallery" } });
		expect(container.textContent).toContain("Gallery");
	});

	it("applies class prop", () => {
		const { container } = render(MediaTemplate, { props: { class: "media-class" } });
		expect(container.firstElementChild?.className).toContain("media-class");
	});
});
