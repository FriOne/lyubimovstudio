export function visitStorybookComponent(componentName: string, storyName: string) {
  cy.visit(`/iframe.html?id=${componentName}--${storyName}`);
  cy.get('body')
    .invoke('css', 'padding', 0)
    .invoke('css', 'height', '100%')
    .get('html')
    .invoke('css', 'height', '100%');
}
