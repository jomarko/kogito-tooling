/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  backendI18nDefaults,
  backendI18nDictionaries
} from "@kogito-tooling/backend/dist/i18n";
import {
  registerTestScenarioRunnerCommand,
  VsCodeBackendProxy
} from "@kogito-tooling/backend/dist/vscode";
import { I18n } from "@kogito-tooling/i18n/dist/core";
import * as KogitoVsCode from "@kogito-tooling/vscode-extension";
import { VsCodeWorkspaceApi } from "@kogito-tooling/workspace/dist/vscode";
import { VsCodeNotificationsApi } from "@kogito-tooling/notifications/dist/vscode";
import * as vscode from "vscode";

let backendProxy: VsCodeBackendProxy;

export async function activate(context: vscode.ExtensionContext) {
  console.info("Extension is alive.");

  const envelopeTargetOrigin = "vscode";

  const workspaceApi = new VsCodeWorkspaceApi();
  const backendI18n = new I18n(
    backendI18nDefaults,
    backendI18nDictionaries,
    vscode.env.language
  );
  const notificationsApi = new VsCodeNotificationsApi(
    workspaceApi,
    backendI18n
  );
  backendProxy = new VsCodeBackendProxy(
    context,
    backendI18n,
    "kie-group.vscode-extension-backend"
  );

  registerTestScenarioRunnerCommand({
    command: "extension.kogito.runTest",
    context: context,
    backendProxy: backendProxy,
    backendI18n: backendI18n,
    workspaceApi: workspaceApi,
    notificationsApi: notificationsApi
  });

  KogitoVsCode.startExtension({
    extensionName: "kie-group.vscode-extension-pack-kogito-kie-editors",
    context: context,
    viewType: "kieKogitoWebviewEditors",
    getPreviewCommandId: "extension.kogito.getPreviewSvg",
    editorEnvelopeLocator: {
      targetOrigin: envelopeTargetOrigin,
      mapping: new Map([
        [
          "bpmn",
          {
            resourcesPathPrefix: "dist/webview/editors/bpmn",
            envelopePath: "dist/webview/GwtEditorsEnvelopeApp.js"
          }
        ],
        [
          "bpmn2",
          {
            resourcesPathPrefix: "dist/webview/editors/bpmn",
            envelopePath: "dist/webview/GwtEditorsEnvelopeApp.js"
          }
        ],
        [
          "dmn",
          {
            resourcesPathPrefix: "dist/webview/editors/dmn",
            envelopePath: "dist/webview/GwtEditorsEnvelopeApp.js"
          }
        ],
        [
          "scesim",
          {
            resourcesPathPrefix: "dist/webview/editors/scesim",
            envelopePath: "dist/webview/GwtEditorsEnvelopeApp.js"
          }
        ]
      ])
    },
    backendProxy: backendProxy
  });

  console.info("Extension is successfully setup.");
}

export function deactivate() {
  backendProxy?.stopServices();
}
