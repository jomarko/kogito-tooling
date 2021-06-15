/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe("Save External Asset Editable.", () => {
  it("Test Load File And View", () => {
    const file: string = Cypress.env("kie_asset");
    assert.isNotEmpty(
      file,
      "Cypress 'kie_asset' environment variable needs to be set. " +
        +"Please refer to: https://docs.cypress.io/guides/guides/environment-variables"
    );

    if (file.substring(file.length - 4) === ".dmn") {
      cy.visit("localhost:9001/dmn-editable");
      cy.loadEditors(["dmn-editable"]);

      cy.editor("dmn-editable").find("[data-field='kie-palette']").should("be.visible");

      cy.editor("dmn-editable")
        .ouiaId("collapsed-docks-bar", "collapsed-docks-bar-W", { timeout: 10000 })
        .should("be.visible");

      cy.uploadFile(file, "dmn-editable");
      cy.viewFile(file, "dmn-editable");
      cy.downloadXml();
    }

    if (file.substring(file.length - 5) === ".bpmn") {
      cy.visit("localhost:9001/bpmn-editable");
      cy.loadEditors(["bpmn-editable"]);

      cy.editor("bpmn-editable").find("[data-field='kie-palette']").should("be.visible");

      cy.uploadFile(file, "bpmn-editable");
      cy.viewFile(file, "bpmn-editable");
      cy.downloadXml();
    }
  });
});
