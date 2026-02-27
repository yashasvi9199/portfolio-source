import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 60000,
    retries: 1,
    use: {
        baseURL: 'http://localhost:3001',
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
    },
    webServer: {
        command: 'npm run dev',
        port: 3001,
        reuseExistingServer: true,
        timeout: 30000,
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});
