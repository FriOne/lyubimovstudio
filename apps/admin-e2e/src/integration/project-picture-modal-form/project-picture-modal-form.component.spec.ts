import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('projectpicturemodalformcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-project-picture-modal-form').should('exist');
  });
});
