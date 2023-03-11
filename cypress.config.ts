import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: '__tests__/**/*.test.ts',
    // The UI are provided from
    // https://github.com/tangentlin/atomic-testing/tree/main/packages/component-driver-mui-v5-test
    baseUrl: 'http://localhost:3000'
  }
});
