import { visitStorybookComponent } from '../../../support/storybook.po';

describe('admin', () => {
  beforeEach(() => visitStorybookComponent('apptoastscomponent', 'primary'));

  it('should render the component', () => {
    cy.get('ls-app-toasts').should('exist');
  });
});
