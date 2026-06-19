import { expect } from "vitest";

let _axe: ReturnType<typeof import("vitest-axe")["configureAxe"]> | undefined;

async function getAxe() {
	if (!_axe) {
		const { configureAxe } = await import("vitest-axe");
		_axe = configureAxe({
			rules: {
				"aria-required-children": { enabled: false },
				"aria-required-parent": { enabled: false },
				"color-contrast": { enabled: false },
			},
		});
	}
	return _axe;
}

export async function expectNoAxeViolations(container: Element | string) {
	const axe = await getAxe();
	const results = await axe(container);
	expect(
		results.violations,
		`a11y violations:\n${JSON.stringify(results.violations, null, 2)}`,
	).toEqual([]);
}
