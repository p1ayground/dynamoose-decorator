import { ModelType, ObjectType } from "dynamoose/dist/General";
import { Item } from "dynamoose/dist/Item";
import {
  IndexType,
  Schema,
  SchemaDefinition,
  TimestampObject,
  ValueType,
} from "dynamoose/dist/Schema";

export interface SchemaSettings {
  timestamps?: boolean | TimestampObject;
  saveUnknown?: boolean | string[];
  set?: (value: ObjectType) => ObjectType;
  get?: (value: ObjectType) => ObjectType;
  validate?: (value: ObjectType) => boolean;
}

export type AttributeType =
  | string
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | typeof Buffer
  | DateConstructor
  | ObjectConstructor
  | ArrayConstructor
  | SetConstructor
  | symbol
  | Schema
  | ModelType<Item>;

export interface AttributeDefinition {
  type?:
    | AttributeType
    | AttributeType[]
    | {
        value: DateConstructor;
        settings?: AttributeDefinitionTypeSettings;
      }
    | {
        value: AttributeType | AttributeType[];
      };
  schema?:
    | AttributeType
    | AttributeType[]
    | AttributeDefinition
    | AttributeDefinition[]
    | SchemaDefinition
    | SchemaDefinition[];
  default?: ValueType | (() => ValueType);
  forceDefault?: boolean;
  validate?:
    | ValueType
    | RegExp
    | ((value: ValueType) => boolean | Promise<boolean>);
  required?: boolean;
  enum?: ValueType[];
  get?: (value: ValueType) => ValueType;
  set?: (
    value: ValueType,
    oldValue?: ValueType
  ) => ValueType | Promise<ValueType>;
  index?: boolean | IndexDefinition | IndexDefinition[];
  hashKey?: boolean;
  rangeKey?: boolean;
  map?: string | string[];
  alias?: string | string[];
  aliases?: string | string[];
  defaultMap?: string;
  defaultAlias?: string;
}

export interface AttributeDefinitionTypeSettings {
  storage?: "milliseconds" | "seconds" | "iso";
  model?: ModelType<Item>;
  attributes?: string[];
  separator?: string;
  value?: string | boolean | number;
}

export interface IndexDefinition {
  name?: string;
  type?: IndexType | keyof typeof IndexType;
  rangeKey?: string;
  project?: boolean | string[];
  throughput?:
    | "ON_DEMAND"
    | number
    | {
        read: number;
        write: number;
      };
}
