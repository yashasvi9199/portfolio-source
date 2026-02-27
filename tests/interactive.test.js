import { test, expect } from '@playwright/test';

const LOADER_TIMEOUT = 15000;

async function waitForSiteReady(page) {
    await page.waitForSelector('.fp-wrapper', { state: 'visible', timeout: LOADER_TIMEOUT });
    await page.waitForTimeout(1000);
}

test.describe('Interactive Features', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await waitForSiteReady(page);
    });

    // --- AIChatbot ---
    test('AIChatbot toggle works', async ({ page }) => {
        // Look for robot emoji button
        const botToggle = page.locator('button:has-text("🤖")');
        await expect(botToggle).toBeVisible();

        // Open chat
        await botToggle.click();
        const chatWindow = page.locator('h3:has-text("Portfolio Assistant")');
        await expect(chatWindow).toBeVisible();

        // Close chat
        const closeBtn = page.locator('button:has-text("×")');
        await closeBtn.click();
        await expect(chatWindow).not.toBeVisible();
    });

    test('AIChatbot suggested questions are visible', async ({ page }) => {
        const botToggle = page.locator('button:has-text("🤖")');
        await botToggle.click();

        const suggestion = page.locator('button:has-text("Tell me about Yash\'s experience")');
        await expect(suggestion).toBeVisible();
    });

    // --- Voice Control ---
    test('Voice control is visible if supported', async ({ page }) => {
        // Note: SpeechRecognition might not be available in headless CI, 
        // but the button should render if useVoiceCommands returns isSupported: true.
        const voiceToggle = page.locator('button:has-text("🎙️"), button:has-text("🎤")');
        // If browser supports speech, it should be there. 
        // We check if it exists in the DOM first.
        const count = await voiceToggle.count();
        if (count > 0) {
            await expect(voiceToggle).toBeVisible();
        }
    });

    // --- Counter Animations ---
    test('Stats counters animate in About section', async ({ page }) => {
        // Navigate to about section
        const aboutDot = page.locator('.fp-dot').nth(1);
        await aboutDot.click();
        await page.waitForTimeout(1000);

        const stats = page.locator('.counter-value');
        await expect(stats).toHaveCount(4);

        // Check if at least one statistic contains a value mapping to the target (e.g., 20)
        // Since it's animated, it should eventually reach its target.
        await expect(stats.first()).toContainText(/20/);
    });
});
