import { visitStorybookComponent } from '../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('appcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-root').should('exist');
  });
});
