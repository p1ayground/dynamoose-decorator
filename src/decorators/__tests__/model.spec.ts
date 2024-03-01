import { Item } from 'dynamoose/dist/Item'

import { getModelTableOptions } from '../../utils/reflect-metadata'
import { kebabCase, snakeCase } from '../../utils/string'
import { Attribute } from '../attribute'
import { getModel, Model, KebabCase, SnakeCase } from '../model'

describe('model', () => {
  it('should set model table options using Model decorator', () => {
    @Model({ create: true, waitForActive: true })
    class DecoratedModel {}

    const options = getModelTableOptions(DecoratedModel)
    expect(options).toEqual({ create: true, waitForActive: true })
  })

  it('should get dynamoose model using getModel function with default options', () => {
    @Model()
    class TestModel extends Item {
      @Attribute() id!: string
    }

    const result = getModel(TestModel)
    expect(result).toHaveProperty('Model')
    expect(result).toHaveProperty('transaction')
    expect(result).toHaveProperty('Item')
    expect(result).toHaveProperty('create')
  })

  it('should get dynamoose model using getModel function with custom name', () => {
    @Model({ tableName: 'ChangedModel' })
    class TestModel extends Item {
      @Attribute() id!: string
    }

    const result = getModel(TestModel)
    expect(result.Model.name).toEqual('ChangedModel')
  })

  it('should get dynamoose model have custom method', () => {
    @Model()
    class TestModel extends Item {
      @Attribute() id!: string
      async testmethod() { }
    }

    const result = getModel(TestModel)
    expect(result).toHaveProperty('testmethod')
  })

  it('should apply KebabCase decorator to set kebab-case table name', () => {
    @KebabCase()
    class DecoratedModel {}

    const options = getModelTableOptions(DecoratedModel)
    expect(options.tableName).toEqual(kebabCase(DecoratedModel.name))
  })

  it('should apply SnakeCase decorator to set snake_case table name', () => {
    @SnakeCase()
    class DecoratedModel {}

    const options = getModelTableOptions(DecoratedModel)
    expect(options.tableName).toEqual(snakeCase(DecoratedModel.name))
  })
})
