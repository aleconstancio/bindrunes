import { describe, expect, it } from "vitest";
import { createTransition } from "./createTransition.svelte";

function makeElement(): HTMLElement {
	const el = document.createElement("div");
	document.body.appendChild(el);
	return el;
}

describe("createTransition", () => {
	it("returns enter/exit/toggle methods", () => {
		const el = makeElement();
		const transition = createTransition(el);

		expect(typeof transition.enter).toBe("function");
		expect(typeof transition.exit).toBe("function");
		expect(typeof transition.toggle).toBe("function");
	});

	it("enter adds and removes class", async () => {
		const el = makeElement();
		const transition = createTransition(el, { enter: "fade-in", duration: 10 });

		const promise = transition.enter();
		expect(el.classList.contains("fade-in")).toBe(true);

		await promise;
		expect(el.classList.contains("fade-in")).toBe(false);
	});

	it("exit adds and removes class", async () => {
		const el = makeElement();
		const transition = createTransition(el, { exit: "fade-out", duration: 10 });

		const promise = transition.exit();
		expect(el.classList.contains("fade-out")).toBe(true);

		await promise;
		expect(el.classList.contains("fade-out")).toBe(false);
	});

	it("toggle calls enter when visible, exit when hidden", async () => {
		const el = makeElement();
		const transition = createTransition(el, { enter: "fade-in", exit: "fade-out", duration: 10 });

		await transition.toggle(true);
		expect(el.classList.contains("fade-in")).toBe(false);

		await transition.toggle(false);
		expect(el.classList.contains("fade-out")).toBe(false);
	});
});
