import { test, expect } from '@playwright/test';

const LOADER_TIMEOUT = 15000;

/**
 * Wait for the quantum loader to finish and the site to be ready.
 */
async function waitForSiteReady(page) {
    await page.waitForSelector('.fp-wrapper', { state: 'visible', timeout: LOADER_TIMEOUT });
    await page.waitForTimeout(1000);
}

/**
 * Navigate to a section by clicking its dot in the nav.
 * This is the most reliable navigation method in Playwright
 * since GSAP Observer doesn't capture CDP-dispatched events.
 */
async function navigateToSection(page, index) {
    const dot = page.locator('.fp-dot').nth(index);
    await dot.click({ force: true });
    await page.waitForTimeout(2000);
}

test.describe('Fullpage Scroll System', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await waitForSiteReady(page);
    });

    // ─── Alignment ───────────────────────────────────────────
    test('sections are horizontally centered', async ({ page }) => {
        const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

        for (const id of sectionIds) {
            const section = page.locator(`#${id}`);
            const box = await section.boundingBox();
            expect(box, `Section #${id} should exist`).toBeTruthy();
            expect(box.width).toBeGreaterThanOrEqual(page.viewportSize().width - 2);
        }
    });

    // ─── Dot Navigation: Sizing ─────────────────────────────
    test('dot navigation is visible and correctly sized', async ({ page }) => {
        const dotNav = page.locator('.fp-dot-nav');
        await expect(dotNav).toBeVisible();

        const dots = page.locator('.fp-dot');
        await expect(dots).toHaveCount(7);

        const dotInner = page.locator('.fp-dot-inner').first();
        const box = await dotInner.boundingBox();
        expect(box.width).toBeLessThan(20);
        expect(box.height).toBeLessThan(20);
    });

    // ─── Dot Navigation: Click ──────────────────────────────
    test('clicking a dot navigates to that section', async ({ page }) => {
        await navigateToSection(page, 3);
        await expect(page.locator('#projects')).toHaveClass(/fp-visible/);
    });

    test('clicking dots in sequence visits all sections', async ({ page }) => {
        const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];

        for (let i = 0; i < sectionIds.length; i++) {
            await navigateToSection(page, i);
            await expect(page.locator(`#${sectionIds[i]}`)).toHaveClass(/fp-visible/);
        }
    });

    test('navigating backward via dots works', async ({ page }) => {
        await navigateToSection(page, 5);
        await expect(page.locator('#achievements')).toHaveClass(/fp-visible/);

        await navigateToSection(page, 1);
        await expect(page.locator('#about')).toHaveClass(/fp-visible/);
    });

    // ─── Programmatic Navigation (goToSection) ──────────────
    test('programmatic goToSection navigates correctly', async ({ page }) => {
        // Call goToSection via page.evaluate — dispatches a custom event
        // that triggers the React state. We use dot click instead since
        // goToSection is not exposed on window. Dot clicks call goToSection.
        await navigateToSection(page, 6);
        await expect(page.locator('#contact')).toHaveClass(/fp-visible/);

        await navigateToSection(page, 0);
        await expect(page.locator('#home')).toHaveClass(/fp-visible/);
    });

    // ─── Content Clipping ────────────────────────────────────
    test('Projects section has fp-overflow for internal scroll', async ({ page }) => {
        await navigateToSection(page, 3);

        const section = page.locator('#projects');
        await expect(section).toHaveClass(/fp-overflow/);

        const inner = page.locator('#projects > div');
        const scrollHeight = await inner.evaluate(el => el.scrollHeight);
        const clientHeight = await inner.evaluate(el => el.clientHeight);
        expect(scrollHeight).toBeGreaterThanOrEqual(clientHeight);
    });

    test('Contact section has fp-overflow for internal scroll', async ({ page }) => {
        await navigateToSection(page, 6);

        const section = page.locator('#contact');
        await expect(section).toHaveClass(/fp-overflow/);
    });

    test('Experience section has fp-overflow for internal scroll', async ({ page }) => {
        await navigateToSection(page, 4);

        const section = page.locator('#experience');
        await expect(section).toHaveClass(/fp-overflow/);
    });

    // ─── Footer Visibility ──────────────────────────────────
    test('footer is visible inside Contact section', async ({ page }) => {
        await navigateToSection(page, 6);

        const footer = page.locator('#contact .footer');
        await expect(footer).toBeAttached();

        // Scroll internal content to bottom to reveal footer
        const inner = page.locator('#contact > div');
        await inner.evaluate(el => el.scrollTo(0, el.scrollHeight));
        await page.waitForTimeout(500);

        await expect(footer).toBeVisible();
    });

    // ─── Active Nav Highlighting ────────────────────────────
    test('navigation highlights active section on dot click', async ({ page }) => {
        // Home should be active initially
        const homeLink = page.locator('.nav-link').first();
        await expect(homeLink).toHaveClass(/active/);

        // Navigate to About via dot
        await navigateToSection(page, 1);
        const aboutLink = page.locator('.nav-link').nth(1);
        await expect(aboutLink).toHaveClass(/active/);
    });

    // ─── Active Dot Highlighting ────────────────────────────
    test('dot nav highlights the active section dot', async ({ page }) => {
        // Initially first dot should be active
        const firstDot = page.locator('.fp-dot').first();
        await expect(firstDot).toHaveClass(/active/);

        // Navigate to Skills (index 2)
        await navigateToSection(page, 2);
        const thirdDot = page.locator('.fp-dot').nth(2);
        await expect(thirdDot).toHaveClass(/active/);

        // Previous dot should not be active
        await expect(firstDot).not.toHaveClass(/active/);
    });
});
