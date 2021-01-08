import { visitStorybookComponent } from '../../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('checkboxcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-checkbox').should('exist');
  });
});
