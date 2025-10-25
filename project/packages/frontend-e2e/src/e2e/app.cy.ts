describe('Frontend App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should redirect unauthenticated users to /login', () => {
    cy.url().should('include', '/login');
    cy.contains('Login');
  });

  it('should navigate to signup page', () => {
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });
});
