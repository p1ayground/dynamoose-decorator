import * as dynamoose from 'dynamoose'
import { Item } from 'dynamoose/dist/Item'
import { ModelTableOptions } from 'dynamoose/dist/Model'

import { getModelTableOptions, setModelTableOptions } from '../utils/reflect-metadata'
import { kebabCase, snakeCase } from '../utils/string'

import { getSchema } from './schema'

export const Model =
  (options: ModelTableOptions = {}) =>
  (target: any) => {
    setModelTableOptions(target, options)
  }

export function getModel<T extends Item>(model: { new (...args: any): T }) {
  const options = getModelTableOptions(model)

  const dynamooseModel = dynamoose.model<T>(options.tableName ?? model.name, getSchema(model), options)

  Object.getOwnPropertyNames(model.prototype).forEach((key) => {
    if (typeof model.prototype[key] === 'function' && key !== 'constructor') {
      // @ts-ignore
      dynamooseModel[key] = model.prototype[key]
    }
  })

  return dynamooseModel
}

// Special

export const KebabCase = () => (target: any) => {
  const options = getModelTableOptions(target)

  options.tableName = kebabCase(options.tableName ?? target.name)

  setModelTableOptions(target, options)
}

export const SnakeCase = () => (target: any) => {
  const options = getModelTableOptions(target)

  options.tableName = snakeCase(options.tableName ?? target.name)

  setModelTableOptions(target, options)
}
