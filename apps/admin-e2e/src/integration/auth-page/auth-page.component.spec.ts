import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => {
    visitStorybookComponent('authpagecomponent', 'primary');
  });

  it('should render the component', () => {
    cy.get('ls-auth-page').should('exist');
  });
});
