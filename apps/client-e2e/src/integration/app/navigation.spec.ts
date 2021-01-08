import { visitStorybookComponent } from '../../support/storybook.po';

describe('client: Navigation component', () => {
  beforeEach(() => visitStorybookComponent('navigation', 'primary'));

  it('should render the component', () => {
    cy
      .viewport('macbook-15')
      .get('.navigation')
      .toMatchImageSnapshot();
  });

  it('should render mobile version of the component', () => {
    cy
      .viewport('iphone-8')
      .get('.navigation')
      .toMatchImageSnapshot();
  });

  it('should open mobile menu on click', () => {
    cy
      .viewport('iphone-8')
      .get('.navigation__toggler')
      .click()
      .get('body')
      .toMatchImageSnapshot();
  });
});
