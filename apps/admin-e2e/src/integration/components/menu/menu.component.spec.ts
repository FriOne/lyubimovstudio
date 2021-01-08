import { visitStorybookComponent } from '../../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('menucomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-menu').should('exist');
  });
});
