import { expect } from "vitest";
import { configureAxe } from "vitest-axe";

const axe = configureAxe({
	rules: {
		"aria-required-children": { enabled: false },
		"aria-required-parent": { enabled: false },
		"color-contrast": { enabled: false },
	},
});

export async function expectNoAxeViolations(container: Element | string) {
	const results = await axe(container);
	expect(
		results.violations,
		`a11y violations:\n${JSON.stringify(results.violations, null, 2)}`,
	).toEqual([]);
}
