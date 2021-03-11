/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
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
import { XML2PMML } from "../../marshaller";
import {
  DataDictionary,
  Model,
  PMML,
  Scorecard
} from "../../marshaller/model/pmml4_4";
import { MINING_SCHEMA_1 } from "./TestData_MiningSchema";

describe("MiningSchema tests", () => {
  test("MiningSchema::Basics for DMN", () => {
    const pmml: PMML = XML2PMML(MINING_SCHEMA_1);

    expect(pmml).not.toBeNull();

    const dataDictionary: DataDictionary = pmml.DataDictionary;
    expect(dataDictionary.DataField.length).toBe(0);

    expect(pmml.models).not.toBeUndefined();
    const models: Model[] = pmml.models as Model[];
    expect(models.length).toBe(1);
    expect(models[0]).toBeInstanceOf(Scorecard);

    const model: Scorecard = models[0] as Scorecard;
    expect(model.modelName).toBe("name");
    expect(model.MiningSchema.MiningField.length).toBe(1);
    expect(model.MiningSchema.MiningField[0].name).toBe("field1");
    expect(model.MiningSchema.MiningField[0].importance).toBe(1);
    expect(model.MiningSchema.MiningField[0].lowValue).toBe(2);
    expect(model.MiningSchema.MiningField[0].highValue).toBe(3);
  });
});
