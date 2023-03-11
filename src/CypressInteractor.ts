import { IClickOption, IInteractor, LocatorChain, locatorUtil, Optional } from '@atomic-testing/core';
import { IEnterTextOption } from '@atomic-testing/core/dist/types';
import userEvent from '@testing-library/user-event';
import { cyPromisify } from './promisify';

export class CypressInteractor implements IInteractor {
  //#region Potentially DOM mutational methods
  async enterText(locator: LocatorChain, text: string, option?: Partial<IEnterTextOption> | undefined): Promise<void> {
    const cssLocator = locatorUtil.toCssSelector(locator);
    if (option?.append) {
      await cyPromisify(cy.get(cssLocator).type(text));
    } else {
      await cyPromisify(cy.get(cssLocator).clear().type(text));
    }
  }

  async selectOptionValue(locator: LocatorChain, values: string[]): Promise<void> {
    const el = await this.getElement(locator);
    if (el != null) {
      await userEvent.selectOptions(el, values);
    }
  }

  async click(locator: LocatorChain, option?: IClickOption): Promise<void> {
    const cssLocator = locatorUtil.toCssSelector(locator);
    await cyPromisify(cy.get(cssLocator).click('center', { force: true }));
  }

  //#endregion

  async getElement<T extends HTMLElement = HTMLElement>(locator: LocatorChain): Promise<T | void>;
  async getElement<T extends HTMLElement = HTMLElement>(locator: LocatorChain, multiple: true): Promise<readonly T[]>;
  async getElement<T extends HTMLElement = HTMLElement>(locator: LocatorChain, multiple: false): Promise<T | void>;
  async getElement<T extends HTMLElement = HTMLElement>(
    locator: LocatorChain,
    multiple?: boolean
  ): Promise<readonly T[] | Optional<T>> {
    const cssLocator = locatorUtil.toCssSelector(locator);
    const $el = await cyPromisify(cy.get('body').find(cssLocator));
    if (multiple) {
      const els: T[] = [];
      for (let i = 0; i < $el.length; i++) {
        els.push($el.get(i) as T);
      }
      return els;
    }
    return $el.get(0) as T;
  }

  getInputValue(locator: LocatorChain): Promise<Optional<string>> {
    const cssLocator = locatorUtil.toCssSelector(locator);
    return cyPromisify(cy.get(cssLocator).invoke('val'));
  }

  async getSelectValues(locator: LocatorChain): Promise<Optional<readonly string[]>> {
    const el = await this.getElement(locator);
    if (el != null) {
      if (el.nodeName === 'SELECT') {
        const options = el.querySelectorAll<HTMLOptionElement>('option:checked');
        const values = Array.from(options).map((o) => o.value);
        return Promise.resolve(values);
      }
    }
    return Promise.resolve(undefined);
  }

  async isChecked(locator: LocatorChain): Promise<boolean> {
    const el = await this.getElement(locator);
    if (el?.tagName === 'INPUT') {
      return (el as HTMLInputElement).checked;
    }
    return false;
  }

  async isDisabled(locator: LocatorChain): Promise<boolean> {
    const el = await this.getElement(locator);
    if (el != null) {
      // @ts-ignore
      const isDisabled = Boolean(el.disabled);
      return Promise.resolve(isDisabled);
    }
    return Promise.resolve(false);
  }

  isReadonly(locator: LocatorChain): Promise<boolean> {
    return this.hasAttribute(locator, 'readonly');
  }

  async hasCssClass(locator: LocatorChain, className: string): Promise<boolean> {
    const el = await this.getElement(locator);
    if (el != null) {
      return Promise.resolve(el.classList.contains(className));
    }
    return Promise.resolve(false);
  }

  async hasAttribute(locator: LocatorChain, name: string): Promise<boolean> {
    const el = await this.getElement(locator);
    if (el != null) {
      return Promise.resolve(el.hasAttribute(name));
    }
    return Promise.resolve(false);
  }

  async getAttribute(locator: LocatorChain, name: string, isMultiple: true): Promise<readonly string[]>;
  async getAttribute(locator: LocatorChain, name: string, isMultiple: false): Promise<Optional<string>>;
  async getAttribute(locator: LocatorChain, name: string): Promise<Optional<string>>;
  async getAttribute(
    locator: LocatorChain,
    name: string,
    isMultiple?: boolean
  ): Promise<Optional<string> | readonly string[]> {
    if (isMultiple) {
      const elements = await this.getElement(locator, true);
      return elements.map((el) => el.getAttribute(name)!);
    } else {
      const el = await this.getElement(locator);
      if (el != null) {
        return el.getAttribute(name) ?? undefined;
      }
    }
  }

  async getText(locator: LocatorChain): Promise<Optional<string>> {
    const el = await this.getElement(locator);
    if (el != null) {
      return Promise.resolve(el.textContent ?? undefined);
    }
  }

  async exists(locator: LocatorChain): Promise<boolean> {
    const cssLocator = locatorUtil.toCssSelector(locator);
    const locs = locatorUtil.getEffectiveLocator(locator);
    const lastLocator = locs[locs.length - 1];
    const priorLocators = locs.slice(0, locs.length - 1);
    const parentEl = await this.getElement(priorLocators);
    const lastSelector = locatorUtil.getLocatorStatement(lastLocator);
    if (parentEl != null) {
      const targetEl = parentEl.querySelector(lastSelector);
      return targetEl != null;
    }
    return false;
  }

  clone(): IInteractor {
    return new CypressInteractor();
  }
}
