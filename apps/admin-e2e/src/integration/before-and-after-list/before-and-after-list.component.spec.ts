import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('beforeandafterlistcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-before-and-after-list').should('exist');
  });
});
