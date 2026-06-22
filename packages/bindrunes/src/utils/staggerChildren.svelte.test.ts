import { describe, expect, it } from "vitest";
import { staggerChildren } from "./staggerChildren.svelte";

function makeParent(childCount: number): HTMLElement {
	const parent = document.createElement("div");
	for (let i = 0; i < childCount; i++) {
		parent.appendChild(document.createElement("div"));
	}
	document.body.appendChild(parent);
	return parent;
}

describe("staggerChildren", () => {
	it("returns animate method", () => {
		const parent = makeParent(3);
		const stagger = staggerChildren(parent);
		expect(typeof stagger.animate).toBe("function");
	});

	it("animate adds class to children with delay", async () => {
		const parent = makeParent(3);
		const stagger = staggerChildren(parent, { animation: "fade-in", delay: 10 });

		stagger.animate();

		await new Promise((r) => setTimeout(r, 0));
		expect(parent.children[0].classList.contains("fade-in")).toBe(true);
	});
});
