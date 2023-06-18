import "reflect-metadata";

import { ModelTableOptions } from "dynamoose/dist/Model";

import { AttributeDefinition, SchemaSettings } from "~/interface";
import { shallowClone } from "~/utils/object";
import { CONVERT_CASES } from "~/utils/string";

export const SCHEMA_ATTRIBUTE_CATEGORIES = {
  attribute: "attribute",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
} as const;

export type SCHEMA_ATTRIBUTE_CATEGORIES =
  keyof typeof SCHEMA_ATTRIBUTE_CATEGORIES;

export const SCHEMA_ATTRIBUTE_KEYS = {
  category: "_dynamoose_decorator-schema_attribute_keys-category",
} as const;

export type SCHEMA_ATTRIBUTE_KEYS = keyof typeof SCHEMA_ATTRIBUTE_KEYS;

export type Attributes = {
  [key: string]: AttributeDefinition & {
    [SCHEMA_ATTRIBUTE_KEYS.category]?: SCHEMA_ATTRIBUTE_CATEGORIES;
  };
};

export const MODEL_OPTION_KEYS = {
  convertCase: "_dynamoose_decorator-model_option_keys-convert_case",
} as const;

export type MODEL_OPTION_KEYS = keyof typeof MODEL_OPTION_KEYS;

export const REFLECT_KEYS = {
  schemaAttributes: "_dynamoose_decorator-reflect_keys-schema_attributes",
  schemaSettings: "_dynamoose_decorator-reflect_keys-schema_settings",
  modelOptions: "_dynamoose_decorator-reflect_keys-model_options",
} as const;

export type ModelOption = ModelTableOptions & {
  [MODEL_OPTION_KEYS.convertCase]?: CONVERT_CASES;
};

export const getSchemaAttributes = (target: any) =>
  shallowClone(
    Reflect.getMetadata(REFLECT_KEYS.schemaAttributes, target)
  ) as Attributes;

export const setSchemaAttributes = (target: any, attributes: Attributes) => {
  Reflect.defineMetadata(REFLECT_KEYS.schemaAttributes, attributes, target);
};

export const getSchemaSettings = (target: any) =>
  shallowClone(
    Reflect.getMetadata(REFLECT_KEYS.schemaSettings, target)
  ) as SchemaSettings;

export const setSchemaSettings = (target: any, settings: SchemaSettings) => {
  Reflect.defineMetadata(REFLECT_KEYS.schemaSettings, settings, target);
};

export const getModelOptions = (target: any) =>
  shallowClone(
    Reflect.getMetadata(REFLECT_KEYS.modelOptions, target)
  ) as ModelOption;

export const setModelOptions = (target: any, options: ModelOption) => {
  Reflect.defineMetadata(REFLECT_KEYS.modelOptions, options, target);
};
