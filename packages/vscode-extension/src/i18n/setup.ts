/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
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

import { en } from "./locales";
import { I18nDefaults, I18nDictionaries } from "@kogito-tooling/i18n/dist/core";
import { VsCodeI18n } from "./VsCodeI18n";

export const vsCodeI18nDefaults: I18nDefaults<VsCodeI18n> = {
  locale: "en",
  dictionary: en
};
export const vsCodeI18nDictionaries: I18nDictionaries<VsCodeI18n> = new Map([
  ["en", en]
]);
