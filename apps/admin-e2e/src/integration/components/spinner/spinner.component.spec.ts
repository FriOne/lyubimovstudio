import { visitStorybookComponent } from '../../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('spinnercomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-spinner').should('exist');
  });
});
