import { ModelTableOptions } from 'dynamoose/dist/Model'

import { AttributeDefinition, SchemaSettings } from '../type'

import 'reflect-metadata'

export const REFLECT_KEYS = {
  attributeDefinitions: 'dynamoose-decorator:attributeDefinitions',
  modelTableOptions: 'dynamoose-decorator:modelTableOptions',
  schemaSettings: 'dynamoose-decorator:schemaSettings',
} as const

type AttributeDefinitions = {
  [key: string]: AttributeDefinition
}

export function getAttributeDefinitions(target: any): AttributeDefinitions {
  return { ...(Reflect.getMetadata(REFLECT_KEYS.attributeDefinitions, target) || {}) }
}

export function setAttributeDefinitions(target: any, definitions: AttributeDefinitions) {
  Reflect.defineMetadata(REFLECT_KEYS.attributeDefinitions, definitions, target)
}

export function getModelTableOptions(target: any): ModelTableOptions {
  return { ...(Reflect.getMetadata(REFLECT_KEYS.modelTableOptions, target) || {}) }
}

export function setModelTableOptions(target: any, options: ModelTableOptions) {
  Reflect.defineMetadata(REFLECT_KEYS.modelTableOptions, options, target)
}

export function getSchmeaSettings(target: any): SchemaSettings {
  return { ...(Reflect.getMetadata(REFLECT_KEYS.schemaSettings, target) || {}) }
}

export function setSchmeaSettings(target: any, settings: SchemaSettings) {
  Reflect.defineMetadata(REFLECT_KEYS.schemaSettings, settings, target)
}
