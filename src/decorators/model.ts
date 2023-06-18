import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";

import { shallowMerge } from "~/utils/object";
import {
  MODEL_OPTION_KEYS,
  ModelOption,
  getModelOptions,
  setModelOptions,
} from "~/utils/reflect-metadata";
import { convertCase } from "~/utils/string";

import { getSchema } from "./schema";

export const Model = (options?: ModelOption) => (target: any) => {
  const merge = shallowMerge(getModelOptions(target), options);

  if (merge[MODEL_OPTION_KEYS.convertCase]) {
    merge.tableName = convertCase(
      merge.tableName ?? target.name,
      merge[MODEL_OPTION_KEYS.convertCase]
    );
  }

  setModelOptions(target, merge);
};

export const getModel = <T extends Item>(model: { new (...args: any): T }) => {
  const modelOptions = getModelOptions(model);

  if (modelOptions[MODEL_OPTION_KEYS.convertCase]) {
    delete modelOptions[MODEL_OPTION_KEYS.convertCase];
  }

  return dynamoose.model<T>(
    modelOptions.tableName ?? model.name,
    getSchema(model),
    modelOptions
  );
};
