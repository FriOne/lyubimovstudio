import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('tagscontrolcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-tags-control').should('exist');
  });
});
