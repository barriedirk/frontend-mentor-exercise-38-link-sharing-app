const login = () => {
  cy.url().should('include', '/login');

  cy.get('[data-testid="button-login-demo-credentials"]').click();

  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(700);
  cy.url().should('include', '/');
  cy.contains('Profile Details');
};

describe('Links Form', () => {
  beforeEach(() => {
    cy.visit('#/login');
  });

  it('Fill Profile Form', () => {
    login();

    cy.get('[data-testid="tab-show-profile-form"]').click();

    cy.get('[data-testid="profile-first-name"]').type(
      '{selectall}{backspace}Demo First Name'
    );
    cy.get('[data-testid="profile-first-name"]').should(
      'have.value',
      'Demo First Name'
    );

    cy.get('[data-testid="profile-last-name"]').clear();
    cy.get('[data-testid="profile-last-name"]').type('Demo Last Name');
    cy.get('[data-testid="profile-last-name"]').should(
      'have.value',
      'Demo Last Name'
    );

    cy.get('[data-testid="profile-slug"]').clear();
    cy.get('[data-testid="profile-slug"]').type('demo-slug');
    cy.get('[data-testid="profile-slug"]').should('have.value', 'demo-slug');

    cy.get('[data-testid="submit-save-profile"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    cy.get('[data-testid="button-profile-logout"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    login();

    cy.get('[data-testid="tab-show-profile-form"]').click();

    cy.get('[data-testid="profile-first-name"]').should(
      'have.value',
      'Demo First Name'
    );

    cy.get('[data-testid="profile-last-name"]').should(
      'have.value',
      'Demo Last Name'
    );
  });

  it('Fill Links Form', () => {
    login();

    cy.get('[data-testid="tab-show-links-form"]').click();

    cy.get('[data-testid="button-add-new-link"]').click();

    cy.get('[data-testid="form-link-form"]')
      .last()
      .within(() => {
        cy.get('[data-testid^="url-link-"]').type(
          'https://www.youtube.com/watch?v=OWn3kKO05jQ'
        );

        cy.get('[data-testid$="-toggle-dropdown-show-options"]').click();

        cy.get('[role="listbox"]')
          .contains('[role="option"]', 'Youtube')
          .click();
      });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    cy.get('[data-testid="submit-save-links"]').click();
  });

  it('Check preview', () => {
    login();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    cy.get('[data-testid="tab-show-preview"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    cy.get('[data-testid="btn-copy-shareable-link"]').click();

    cy.get('[data-testid="btn-back-profile-editor"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    cy.get('[data-testid="tab-show-profile-form"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    cy.get('[data-testid="button-profile-logout"]').click();
  });
});
