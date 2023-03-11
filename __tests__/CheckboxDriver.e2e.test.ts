import { CheckboxDriver } from '@atomic-testing/component-driver-mui-v5';
import { byDataTestId, ScenePart, TestEngine } from '@atomic-testing/core';
import { createTestEngine } from '../src';

export const labelCheckboxExampleScenePart = {
  apple: {
    locator: byDataTestId('apple'),
    driver: CheckboxDriver
  },
  banana: {
    locator: byDataTestId('banana'),
    driver: CheckboxDriver
  }
} satisfies ScenePart;

export const iconCheckboxExampleScenePart = {
  favorite: {
    locator: byDataTestId('favorite'),
    driver: CheckboxDriver
  },
  bookmark: {
    locator: byDataTestId('bookmark'),
    driver: CheckboxDriver
  }
} satisfies ScenePart;

export const indeterminateCheckboxExampleScenePart = {
  parent: {
    locator: byDataTestId('parent'),
    driver: CheckboxDriver
  },
  child1: {
    locator: byDataTestId('child1'),
    driver: CheckboxDriver
  },
  child2: {
    locator: byDataTestId('child2'),
    driver: CheckboxDriver
  }
} satisfies ScenePart;

describe(`labelCheckboxExample`, () => {
  let testEngine: TestEngine<typeof labelCheckboxExampleScenePart>;
  beforeEach(() => {
    cy.visit('/checkbox');
    testEngine = createTestEngine(labelCheckboxExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`apple is checked initially`, async () => {
    const selected = await testEngine.parts.apple.isSelected();
    expect(selected).to.be.true;
  });

  it(`banana is not checked initially`, async () => {
    const selected = await testEngine.parts.banana.isSelected();
    expect(selected).to.be.false;
  });

  it(`switching apple to unchecked should return false upon completion`, async () => {
    await testEngine.parts.apple.setSelected(false);
    const selected = await testEngine.parts.apple.isSelected();
    expect(selected).to.be.false;
  });
});

describe(`iconCheckboxExample`, () => {
  let testEngine: TestEngine<typeof iconCheckboxExampleScenePart>;
  beforeEach(() => {
    cy.visit('/checkbox');
    testEngine = createTestEngine(iconCheckboxExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`favorite is not checked initially`, async () => {
    const selected = await testEngine.parts.favorite.isSelected();
    expect(selected).to.be.false;
  });

  it(`bookmark is not checked initially`, async () => {
    const selected = await testEngine.parts.bookmark.isSelected();
    expect(selected).to.be.false;
  });

  it(`switching favorite to checked should return true upon completion`, async () => {
    await testEngine.parts.favorite.setSelected(true);
    const selected = await testEngine.parts.favorite.isSelected();
    expect(selected).to.be.true;
  });
});

describe(`indeterminateCheckboxExample`, () => {
  let testEngine: TestEngine<typeof indeterminateCheckboxExampleScenePart>;
  beforeEach(() => {
    cy.visit('/checkbox');
    testEngine = createTestEngine(indeterminateCheckboxExampleScenePart);
  });

  afterEach(async () => {
    await testEngine.cleanUp();
  });

  it(`parent is not checked initially`, async () => {
    const selected = await testEngine.parts.parent.isSelected();
    expect(selected).to.be.false;
  });

  it(`parent is indeterminate initially`, async () => {
    const selected = await testEngine.parts.parent.isIndeterminate();
    expect(selected).to.be.true;
  });

  describe(`When checking all the children`, () => {
    it(`parent should be checked`, async () => {
      await testEngine.parts.child1.setSelected(true);
      await testEngine.parts.child2.setSelected(true);
      const selected = await testEngine.parts.parent.isSelected();
      expect(selected).to.be.true;
    });

    it(`parent should not be indeterminate`, async () => {
      await testEngine.parts.child1.setSelected(true);
      await testEngine.parts.child2.setSelected(true);
      const selected = await testEngine.parts.parent.isIndeterminate();
      expect(selected).to.be.false;
    });
  });

  describe(`When unchecking all the children`, () => {
    it(`parent should not be checked`, async () => {
      await testEngine.parts.child1.setSelected(false);
      await testEngine.parts.child2.setSelected(false);
      const selected = await testEngine.parts.parent.isSelected();
      expect(selected).to.be.false;
    });

    // eslint-disable-next-line jest/no-identical-title
    it(`parent should not be indeterminate`, async () => {
      await testEngine.parts.child1.setSelected(false);
      await testEngine.parts.child2.setSelected(false);
      const selected = await testEngine.parts.parent.isIndeterminate();
      expect(selected).to.be.false;
    });
  });

  describe('When checking parent', () => {
    // eslint-disable-next-line jest/no-identical-title
    it(`parent should not be indeterminate`, async () => {
      await testEngine.parts.parent.setSelected(true);
      const selected = await testEngine.parts.child1.isIndeterminate();
      expect(selected).to.be.false;
    });

    it(`child1 should be checked`, async () => {
      await testEngine.parts.parent.setSelected(true);
      const selected = await testEngine.parts.child1.isSelected();
      expect(selected).to.be.true;
    });

    it(`child2 should be checked`, async () => {
      await testEngine.parts.parent.setSelected(true);
      const selected = await testEngine.parts.child2.isSelected();
      expect(selected).to.be.true;
    });
  });

  describe('When unchecking parent', () => {
    // eslint-disable-next-line jest/no-identical-title
    it(`parent should not be indeterminate`, async () => {
      await testEngine.parts.parent.setSelected(false);
      const selected = await testEngine.parts.child1.isIndeterminate();
      expect(selected).to.be.false;
    });

    it(`child1 should not be checked`, async () => {
      await testEngine.parts.parent.setSelected(false);
      const selected = await testEngine.parts.child1.isSelected();
      expect(selected).to.be.false;
    });

    it(`child2 should not be checked`, async () => {
      await testEngine.parts.parent.setSelected(false);
      const selected = await testEngine.parts.child2.isSelected();
      expect(selected).to.be.false;
    });
  });
});
