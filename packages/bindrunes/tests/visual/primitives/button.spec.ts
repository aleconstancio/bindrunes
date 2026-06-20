import { expect, test } from "@playwright/test";

test("button variants render correctly", async ({ page }) => {
	await page.goto("/visual/button");

	// Test primary variant
	const primaryButton = page.locator('[data-variant="primary"]');
	await expect(primaryButton).toHaveScreenshot("button-primary.png");

	// Test secondary variant
	const secondaryButton = page.locator('[data-variant="secondary"]');
	await expect(secondaryButton).toHaveScreenshot("button-secondary.png");

	// Test disabled state
	const disabledButton = page.locator('[data-disabled="true"]');
	await expect(disabledButton).toHaveScreenshot("button-disabled.png");
});
