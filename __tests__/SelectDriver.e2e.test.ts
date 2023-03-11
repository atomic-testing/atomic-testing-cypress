// import { SelectDriver } from '@atomic-testing/component-driver-mui-v5';
import { byDataTestId, ScenePart } from '@atomic-testing/core';
import { createTestEngine } from '../src';
import { SelectDriver } from './SelectDriver';

export const basicSelectExampleScenePart = {
  select: {
    locator: byDataTestId('simple-select'),
    driver: SelectDriver
  }
} satisfies ScenePart;

export const nativeSelectExampleScenePart = {
  select: {
    locator: byDataTestId('native-select'),
    driver: SelectDriver
  }
} satisfies ScenePart;

// Cypress cannot click on MUI Select's trigger button
it.skip(`basicExample`, async () => {
  cy.visit('/select');
  const testEngine = createTestEngine(basicSelectExampleScenePart);
  const targetValue = '30';
  await testEngine.parts.select.setValue(targetValue);
  const val = await testEngine.parts.select.getValue();
  expect(val).to.equal(targetValue);
});

it.skip(`nativeExample`, async () => {
  cy.visit('/select');
  const testEngine = createTestEngine(nativeSelectExampleScenePart);
  const targetValue = '30';
  await testEngine.parts.select.setValue(targetValue);
  const val = await testEngine.parts.select.getValue();
  expect(val).to.equal(targetValue);
  await testEngine.cleanUp();
});
