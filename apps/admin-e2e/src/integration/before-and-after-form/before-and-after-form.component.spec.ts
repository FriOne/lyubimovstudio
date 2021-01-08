import { visitStorybookComponent } from '../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('beforeandafterformcomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-before-and-after-form').should('exist');
  });
});
