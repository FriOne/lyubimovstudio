import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('pictureslistcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-pictures-list').should('exist');
  });
});
