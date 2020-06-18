context('Check sample models successfully created', () => {

  beforeEach(() => {
    // visit home page of the Online Editor
    cy.visit('/')
  })

  it('Try BPMN sample', () => {
    cy.trySampleModel('bpmn')

    cy.getDiagramEditorBody().within(() => {
      cy.get('[data-title="Explore Diagram"]').click();
      cy.get('[data-field="explorerPanelBody"]')
        .contains("Process travelers")
    })
  })

  it('Try DMN sample', () => {
    cy.trySampleModel('dmn')

    cy.getDiagramEditorBody().within(($diagramEditor) => {
      cy.get('.fa-chevron-right').click();
      cy.get('li[data-i18n-prefix="DecisionNavigatorTreeView."]')
        .should("have.attr", "title", "loan_pre_qualification");
    })
  })
})