import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('picturedropzonepreviewcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-picture-dropzone-preview').should('exist');
  });
});
