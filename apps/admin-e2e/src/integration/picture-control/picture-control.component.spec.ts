import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('picturecontrolcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-picture-control').should('exist');
  });
});
