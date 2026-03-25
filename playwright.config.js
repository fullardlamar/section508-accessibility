const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list']
  ],
  use: {
    browserName: 'chromium',
    headless: true,
  },
});