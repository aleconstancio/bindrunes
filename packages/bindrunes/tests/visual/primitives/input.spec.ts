import { expect, test } from "@playwright/test";

test("input variants render correctly", async ({ page }) => {
	await page.goto("/visual/input");

	// Test default state
	const input = page.locator("input");
	await expect(input).toHaveScreenshot("input-default.png");

	// Test focus state
	await input.focus();
	await expect(input).toHaveScreenshot("input-focus.png");

	// Test error state
	const errorInput = page.locator('[data-error="true"]');
	await expect(errorInput).toHaveScreenshot("input-error.png");
});
