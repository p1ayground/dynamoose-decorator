import * as dynamoose from 'dynamoose'
import { Item } from 'dynamoose/dist/Item'

import { SchemaSettings } from '../type'
import { getAttributeDefinitions, getSchmeaSettings, setSchmeaSettings } from '../utils/reflect-metadata'

export const Schema =
  (settings: SchemaSettings = {}) =>
  (target: any) => {
    setSchmeaSettings(target.constructor, settings)
  }

export function getSchema<T extends Item>(model: { new (...args: any): T }) {
  const definitions = getAttributeDefinitions(model)
  const settings = getSchmeaSettings(model)

  const keys = Object.keys(definitions)
  for (const key of keys) {
    const specialType = definitions[key]._specialType
    switch (specialType) {
      case 'createdAt':
      case 'updatedAt':
        if (typeof settings.timestamps !== 'object') {
          settings.timestamps = {}
        }

        settings.timestamps[specialType] = {
          [key]: definitions[key],
        }

        delete definitions[key]
        continue
    }
  }

  return new dynamoose.Schema(definitions, settings)
}
