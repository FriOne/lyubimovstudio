import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('projectslistcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-projects-list').should('exist');
  });
});
