# Tests

Playwright browser tests for the Automation Exercise site. The shared `auth.setup.js` signs in the configured test account and saves its browser state for authenticated tests.

Choose a folder based on what a test is meant to verify:

- [e2e](./e2e/README.md): a complete journey that crosses multiple features.
- [modules](./modules/README.md): one feature or a focused step, kept independent of unrelated flows.
- [scenario](./scenario/README.md): a numbered or explicitly defined business scenario.

Keep each spec focused on observable user behavior, use the shared page fixtures and test data where appropriate, and avoid duplicating coverage across folders unless the test has a distinct purpose.
