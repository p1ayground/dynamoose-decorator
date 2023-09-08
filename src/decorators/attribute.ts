import {
  AttributeDefinition,
  AttributeDefinitionTypeSettings,
  AttributeType,
} from "~/interface";
import { shallowMerge } from "~/utils/object";
import {
  SCHEMA_ATTRIBUTE_CATEGORIES,
  SCHEMA_ATTRIBUTE_KEYS,
  getSchemaAttributes,
  setSchemaAttributes,
} from "~/utils/reflect-metadata";

export const Attribute =
  (definition?: AttributeDefinition) => (target: any, key: string) => {
    setAttribute(
      target.constructor,
      key,
      SCHEMA_ATTRIBUTE_CATEGORIES.attribute,
      definition
    );
  };

export const CreatedAt =
  (definition?: AttributeDefinition) => (target: any, key: string) => {
    setAttribute(
      target.constructor,
      key,
      SCHEMA_ATTRIBUTE_CATEGORIES.createdAt,
      definition ?? { type: Date }
    );
  };

export const UpdatedAt =
  (definition?: AttributeDefinition) => (target: any, key: string) => {
    setAttribute(
      target.constructor,
      key,
      SCHEMA_ATTRIBUTE_CATEGORIES.updatedAt,
      definition ?? { type: Date }
    );
  };

const setAttribute = (
  target: any,
  key: string,
  category: SCHEMA_ATTRIBUTE_CATEGORIES,
  definition?: AttributeDefinition
) => {
  const attributes = getSchemaAttributes(target) ?? {};
  const attribute = shallowMerge(attributes[key], definition, {
    [SCHEMA_ATTRIBUTE_KEYS.category]: category,
  });

  if (!attribute?.type) {
    attribute.type = Reflect.getMetadata(
      "design:type",
      target,
      key
    ) as AttributeType;
  }

  attributes[key] = attribute;
  setSchemaAttributes(target, attributes);
};

export const Storage =
  (storage: AttributeDefinitionTypeSettings["storage"]) =>
  (target: any, key: string) => {
    const attributes = getSchemaAttributes(target.constructor);
    const attribute = attributes[key] ?? {};

    if (attribute.type === Date) {
      attribute.type = {
        value: attribute.type as DateConstructor,
        settings: {
          storage,
        },
      };
    } else if (
      typeof attribute.type === "object" &&
      "value" in attribute.type &&
      attribute.type.value === Date
    ) {
      attribute.type = {
        value: attribute.type.value,
        settings: { storage },
      };
    }

    setSchemaAttributes(target, attributes);
  };
