import { expect, test } from "@playwright/test";

test("card variants render correctly", async ({ page }) => {
	await page.goto("/visual/card");

	// Test surface variant
	const surfaceCard = page.locator('[data-variant="surface"]');
	await expect(surfaceCard).toHaveScreenshot("card-surface.png");

	// Test glass variant
	const glassCard = page.locator('[data-variant="glass"]');
	await expect(glassCard).toHaveScreenshot("card-glass.png");
});
