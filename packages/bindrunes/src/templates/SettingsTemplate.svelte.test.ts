import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SettingsTemplate from "./SettingsTemplate.svelte";

describe("SettingsTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(SettingsTemplate);
		expect(container).toBeTruthy();
	});
});
