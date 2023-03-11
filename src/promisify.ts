export function cyPromisify<T>(chain: Cypress.Chainable<T>): Promise<T> {
  return new Cypress.Promise((resolve, reject) => {
    function setup() {
      Cypress.on('fail', rejectPromise);
    }

    function teardown() {
      Cypress.off('fail', rejectPromise);
    }

    function rejectPromise(error: Cypress.CypressError) {
      reject(error);
      teardown();
    }

    setup();

    chain.then((val: T) => {
      resolve(val);
      teardown();
    });
  });
}
