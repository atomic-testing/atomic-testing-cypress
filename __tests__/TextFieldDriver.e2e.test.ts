import { TextFieldDriver } from '@atomic-testing/component-driver-mui-v5';
import { byDataTestId, ScenePart, TestEngine } from '@atomic-testing/core';
import { createTestEngine } from '../src';

export const basicTextFieldExampleScenePart = {
  basic: {
    locator: byDataTestId('basic'),
    driver: TextFieldDriver
  }
} satisfies ScenePart;

export const multilineTextFieldExampleScenePart = {
  multiline: {
    locator: byDataTestId('multiline'),
    driver: TextFieldDriver
  }
} satisfies ScenePart;

export const selectTextFieldExampleScenePart = {
  select: {
    locator: byDataTestId('select'),
    driver: TextFieldDriver
  }
} satisfies ScenePart;

export const readonlyAndDisabledTextFieldExampleScenePart = {
  textDisabled: {
    locator: byDataTestId('text-disabled'),
    driver: TextFieldDriver
  },
  textReadonly: {
    locator: byDataTestId('text-readonly'),
    driver: TextFieldDriver
  },
  multilineDisabled: {
    locator: byDataTestId('multiline-disabled'),
    driver: TextFieldDriver
  },
  multilineReadonly: {
    locator: byDataTestId('multiline-readonly'),
    driver: TextFieldDriver
  },
  selectDisabled: {
    locator: byDataTestId('select-disabled'),
    driver: TextFieldDriver
  },
  selectReadonly: {
    locator: byDataTestId('select-readonly'),
    driver: TextFieldDriver
  },
  nativeSelectDisabled: {
    locator: byDataTestId('native-select-disabled'),
    driver: TextFieldDriver
  },
  nativeSelectReadonly: {
    locator: byDataTestId('native-select-readonly'),
    driver: TextFieldDriver
  }
} satisfies ScenePart;

describe(`basicTextFieldExample`, () => {
  let testEngine: TestEngine<typeof basicTextFieldExampleScenePart>;
  beforeEach(async () => {
    cy.visit('/textfield');
    testEngine = createTestEngine(basicTextFieldExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`Label should be Basic Field`, async () => {
    const label = await testEngine.parts.basic.getLabel();
    expect(label).to.equal('Basic Field');
  });

  it(`Helper text should be Enter text here`, async () => {
    const helperText = await testEngine.parts.basic.getHelperText();
    expect(helperText).to.equal('Enter text here');
  });

  it(`Value should be empty`, async () => {
    const value = await testEngine.parts.basic.getValue();
    expect(value).to.equal('');
  });

  it(`Alter value should change the value`, async () => {
    await testEngine.parts.basic.setValue('Hello World');
    const value = await testEngine.parts.basic.getValue();
    expect(value).to.equal('Hello World');
  });
});

describe(`multilineTextFieldExampleScenePart`, () => {
  let testEngine: TestEngine<typeof multilineTextFieldExampleScenePart>;
  beforeEach(async () => {
    cy.visit('/textfield');
    testEngine = createTestEngine(multilineTextFieldExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`Label should be Multiline`, async () => {
    const label = await testEngine.parts.multiline.getLabel();
    expect(label).to.equal('Multiline');
  });

  it(`Helper text should be undefined`, async () => {
    const helperText = await testEngine.parts.multiline.getHelperText();
    expect(helperText).to.be.undefined;
  });

  it(`Value should be "Default Value" as assigned`, async () => {
    const value = await testEngine.parts.multiline.getValue();
    expect(value).to.equal('Default Value');
  });

  it(`Alter value should change the Hello World`, async () => {
    await testEngine.parts.multiline.setValue('Hello World');
    const value = await testEngine.parts.multiline.getValue();
    expect(value).to.equal('Hello World');
  });
});

// Cypress cannot correctly click on MUI Select component
describe.skip(`selectTextFieldExample`, () => {
  let testEngine: TestEngine<typeof selectTextFieldExampleScenePart>;
  beforeEach(async () => {
    cy.visit('/textfield');
    testEngine = createTestEngine(selectTextFieldExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`Label should be Number`, async () => {
    const label = await testEngine.parts.select.getLabel();
    expect(label).to.equal('Number');
  });

  it(`Value should be "30" as assigned`, async () => {
    const value = await testEngine.parts.select.getValue();
    expect(value).to.equal('30');
  });

  it(`Alter value to 60 should change to 60`, async () => {
    await testEngine.parts.select.setValue('60');
    const value = await testEngine.parts.select.getValue();
    expect(value).to.equal('60');
  });
});

describe(`readonlyAndDisabledTextFieldExample`, () => {
  let testEngine: TestEngine<typeof readonlyAndDisabledTextFieldExampleScenePart>;
  beforeEach(async () => {
    cy.visit('/textfield');
    testEngine = createTestEngine(readonlyAndDisabledTextFieldExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`Readonly TextField should be readonly`, async () => {
    const isReadOnly = await testEngine.parts.textReadonly.isReadonly();
    expect(isReadOnly).to.be.true;
  });

  it(`Readonly TextField value should be Hello World`, async () => {
    const value = await testEngine.parts.textReadonly.getValue();
    expect(value).to.equal('Hello World');
  });

  it(`Disabled TextField should be disabled`, async () => {
    const isDisabled = await testEngine.parts.textDisabled.isDisabled();
    expect(isDisabled).to.to.be.true;
  });

  it(`Disabled TextField value should be Hello World`, async () => {
    const value = await testEngine.parts.textDisabled.getValue();
    expect(value).to.equal('Hello World');
  });

  it(`Readonly Multi-TextField should be readonly`, async () => {
    const isReadOnly = await testEngine.parts.multilineReadonly.isReadonly();
    expect(isReadOnly).to.to.be.true;
  });

  it(`Readonly Multi-TextField value should be Hello World`, async () => {
    const value = await testEngine.parts.multilineReadonly.getValue();
    expect(value).to.equal('Hello World');
  });

  it(`Disabled Multi-TextField should be disabled`, async () => {
    const isDisabled = await testEngine.parts.multilineDisabled.isDisabled();
    expect(isDisabled).to.to.be.true;
  });

  it(`Disabled Multi-TextField value should be Hello World`, async () => {
    const value = await testEngine.parts.multilineDisabled.getValue();
    expect(value).to.equal('Hello World');
  });

  it.skip(`Readonly Select TextField should be readonly`, async () => {
    const isReadOnly = await testEngine.parts.selectReadonly.isReadonly();
    expect(isReadOnly).to.to.be.true;
  });

  it.skip(`Readonly Select TextField value should be 20`, async () => {
    const value = await testEngine.parts.selectReadonly.getValue();
    expect(value).to.equal('20');
  });

  it.skip(`Disabled Select TextField should be disabled`, async () => {
    const isDisabled = await testEngine.parts.selectDisabled.isDisabled();
    expect(isDisabled).to.to.be.true;
  });

  it.skip(`Disabled Select TextField value should be 60`, async () => {
    const value = await testEngine.parts.selectDisabled.getValue();
    expect(value).to.equal('60');
  });

  it(`Readonly Native Select TextField should be readonly`, async () => {
    const isReadOnly = await testEngine.parts.nativeSelectReadonly.isReadonly();
    expect(isReadOnly).to.to.be.true;
  });

  it(`Readonly Native Select TextField value should be 20`, async () => {
    const value = await testEngine.parts.nativeSelectReadonly.getValue();
    expect(value).to.equal('20');
  });

  it(`Disabled Native Select TextField should be disabled`, async () => {
    const isDisabled = await testEngine.parts.nativeSelectDisabled.isDisabled();
    expect(isDisabled).to.to.be.true;
  });

  it(`Disabled Native Select TextField value should be 60`, async () => {
    const value = await testEngine.parts.nativeSelectDisabled.getValue();
    expect(value).to.equal('60');
  });
});
