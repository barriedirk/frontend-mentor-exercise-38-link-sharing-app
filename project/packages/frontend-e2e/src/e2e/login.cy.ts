describe('Login', () => {
  beforeEach(() => {
    cy.visit('#/login');
  });

  it('should redirect unauthenticated users to /login', () => {
    cy.visit('#/');

    cy.url().should('include', '/login');
    cy.contains('Login');
  });

  it('should navigate to signup page', () => {
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });

  it('Fill Login Form page', () => {
    cy.url().should('include', '/login');

    cy.get('[data-testid="email"]').type('demo-devlinks-app@fakeemail.com');
    cy.get('[data-testid="email"]').should(
      'have.value',
      'demo-devlinks-app@fakeemail.com'
    );

    cy.get('[data-testid="password"]').type('3nT3rt#4inMen1');
    cy.get('[data-testid="password"]').should('have.value', '3nT3rt#4inMen1');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(700).then(() => {
      cy.get('[data-testid="button-login-submit"]').click();
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(700);
    cy.url().should('include', '/');
    cy.contains('Profile Details');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    cy.get('[data-testid="button-profile-logout"]').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(50);
    cy.url().should('include', '/login');
    cy.contains('Login');
  });
});
