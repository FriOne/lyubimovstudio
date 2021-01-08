import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('projectpicturescomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-project-pictures').should('exist');
  });
});
