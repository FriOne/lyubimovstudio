import { visitStorybookComponent } from '../../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('selectcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-select').should('exist');
  });
});
