import * as dynamoose from "dynamoose";
import { Item } from "dynamoose/dist/Item";
import { SchemaDefinition } from "dynamoose/dist/Schema";

import { SchemaSettings } from "~/interface";
import { shallowMerge } from "~/utils/object";
import {
  SCHEMA_ATTRIBUTE_CATEGORIES,
  SCHEMA_ATTRIBUTE_KEYS,
  getSchemaAttributes,
  getSchemaSettings,
  setSchemaSettings,
} from "~/utils/reflect-metadata";

export const Schema = (settings?: SchemaSettings) => (target: any) => {
  const merge = shallowMerge(getSchemaSettings(target), settings);

  setSchemaSettings(target, merge);
};

export const getSchema = <T extends Item>(model: { new (...args: any): T }) => {
  const settings = getSchemaSettings(model);
  const attributes = getSchemaAttributes(model);

  const attributeKeys = Object.keys(attributes);
  for (const attributeKey of attributeKeys) {
    const category = attributes[attributeKey]?.[SCHEMA_ATTRIBUTE_KEYS.category];
    switch (category) {
      case SCHEMA_ATTRIBUTE_CATEGORIES.createdAt:
      case SCHEMA_ATTRIBUTE_CATEGORIES.updatedAt:
        if (typeof settings.timestamps !== "object") {
          settings.timestamps = {};
        }

        settings.timestamps[category] = {
          [attributeKey]: attributes[attributeKey],
        } as SchemaDefinition;

        delete attributes[attributeKey];
        continue;
    }
  }

  return new dynamoose.Schema(attributes as SchemaDefinition, settings);
};
