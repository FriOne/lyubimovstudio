import { visitStorybookComponent } from '../../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('layoutcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-layout').should('exist');
  });
});
