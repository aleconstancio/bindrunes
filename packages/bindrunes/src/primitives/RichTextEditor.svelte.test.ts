import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import RichTextEditor from "./RichTextEditor.svelte";

describe("RichTextEditor", () => {
	it("renders without errors", () => {
		const { container } = render(RichTextEditor);
		expect(container).toBeTruthy();
	});
});
