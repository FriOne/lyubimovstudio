import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('tagslistcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-tags-list').should('exist');
  });
});
