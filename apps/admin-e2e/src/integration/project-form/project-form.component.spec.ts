import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('projectformcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-project-form').should('exist');
  });
});
