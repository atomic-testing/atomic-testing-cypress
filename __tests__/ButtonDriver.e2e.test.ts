import { HTMLElementDriver } from '@atomic-testing/component-driver-html';
import { ButtonDriver } from '@atomic-testing/component-driver-mui-v5';
import { byDataTestId, ScenePart, TestEngine } from '@atomic-testing/core';
import { createTestEngine } from '../src';

export const iconAndLabelExampleScenePart = {
  iconButton: {
    locator: byDataTestId('icon-button'),
    driver: ButtonDriver
  },
  iconLabelButton: {
    locator: byDataTestId('icon-label-button'),
    driver: ButtonDriver
  },
  target: {
    locator: byDataTestId('target'),
    driver: HTMLElementDriver
  }
} satisfies ScenePart;

export const complexExampleScenePart = {
  imageButton: {
    locator: byDataTestId('image-button'),
    driver: ButtonDriver
  },
  target: {
    locator: byDataTestId('image-button-target'),
    driver: HTMLElementDriver
  }
} satisfies ScenePart;

describe(`iconAndLabelExample`, () => {
  let testEngine: TestEngine<typeof iconAndLabelExampleScenePart>;
  beforeEach(() => {
    cy.visit('/button');
    testEngine = createTestEngine(iconAndLabelExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`Target should be empty initially`, async () => {
    const text = await testEngine.parts.target.getText();
    expect(text).to.equal('');
  });

  it(`Click on icon-button should display icon-button`, async () => {
    await testEngine.parts.iconButton.click();
    const text = await testEngine.parts.target.getText();
    expect(text).to.equal('icon-button');
  });

  it(`Click on icon-label-button should display icon-label-button`, async () => {
    await testEngine.parts.iconLabelButton.click();
    const text = await testEngine.parts.target.getText();
    expect(text).to.equal('icon-label-button');
  });
});

describe(`complexExample`, () => {
  let testEngine: TestEngine<typeof complexExampleScenePart>;
  beforeEach(async () => {
    cy.visit('/button');
    testEngine = createTestEngine(complexExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`Image target should be empty initially`, async () => {
    const text = await testEngine.parts.target.getText();
    expect(text).to.equal('');
  });

  it(`Click on image-button should display image-button`, async () => {
    await testEngine.parts.imageButton.click();
    const text = await testEngine.parts.target.getText();
    expect(text).to.equal('image-button');
  });
});
