import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('projectpicturedropzonepreviewcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-project-picture-dropzone-preview').should('exist');
  });
});
