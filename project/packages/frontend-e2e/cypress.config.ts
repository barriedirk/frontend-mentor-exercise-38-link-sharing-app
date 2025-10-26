import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

const nxPreset = nxE2EPreset(__filename, {
  cypressDir: 'src',
  bundler: 'vite',
  webServerCommands: {
    default: 'pnpm exec nx run @project/frontend:dev',
    production: 'pnpm exec nx run @project/frontend:preview',
  },
  ciWebServerCommand: 'pnpm exec nx run @project/frontend:preview',
  ciBaseUrl: 'http://localhost:4200',
});

export default defineConfig({
  e2e: {
    ...nxPreset,
    setupNodeEvents(on, config) {
      // You can add event listeners here if needed
      return config;
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'src/support/e2e.ts',
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    screenshotOnRunFailure: true,
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
    },
  },
});
