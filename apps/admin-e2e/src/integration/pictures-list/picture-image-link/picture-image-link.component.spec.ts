import { visitStorybookComponent } from '../../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('pictureimagelinkcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-picture-image-link').should('exist');
  });
});
