import { getAttributeDefinitions } from '../../utils/reflect-metadata'
import {
  Attribute,
  Default,
  ForceDefault,
  Required,
  Enum,
  Index,
  HashKey,
  RangeKey,
  Alias,
  CreatedAt,
  UpdatedAt,
  Storage,
} from '../attribute'

describe('attribute', () => {
  interface ObjectInterface {
    testA: string
    testB: number
  }

  class TestSchema {
    @Attribute()
    normalAttribute!: string

    @Attribute()
    objectAttribute!: ObjectInterface

    @Default('default-value')
    @Attribute()
    attributeWithDefault!: string

    @ForceDefault()
    @Default('force-default-value')
    @Attribute()
    attributeWithForceDefault!: string

    @Required()
    @Attribute()
    requiredAttribute!: string

    @Enum(['value1', 'value2'])
    @Attribute()
    enumAttribute!: string

    @Index({ name: 'indexName' })
    @Attribute()
    indexedAttribute!: string

    @HashKey()
    @Attribute()
    hashKeyAttribute!: string

    @RangeKey()
    @Attribute()
    rangeKeyAttribute!: string

    @Alias('aliasName')
    @Attribute()
    aliasedAttribute!: string

    @CreatedAt()
    @Attribute()
    createdAtAttribute!: Date

    @UpdatedAt()
    @Attribute()
    updatedAtAttribute!: Date

    @Storage('milliseconds')
    @Attribute()
    dateMilliseconds!: Date

    @Storage('iso')
    @Attribute()
    dateIso!: Date
  }

  it('should apply attribute decorators correctly', () => {
    const targetInstance = new TestSchema()

    const definitions = getAttributeDefinitions(targetInstance.constructor)

    expect(definitions['normalAttribute']).toBeDefined()
    expect(definitions['objectAttribute']).toBeDefined()
    expect(definitions['attributeWithDefault'].default).toEqual('default-value')
    expect(definitions['attributeWithForceDefault'].forceDefault).toEqual(true)
    expect(definitions['requiredAttribute'].required).toEqual(true)
    expect(definitions['enumAttribute'].enum).toEqual(['value1', 'value2'])
    expect(definitions['indexedAttribute'].index).toEqual({ name: 'indexName' })
    expect(definitions['hashKeyAttribute'].hashKey).toEqual(true)
    expect(definitions['rangeKeyAttribute'].rangeKey).toEqual(true)
    expect(definitions['createdAtAttribute']._specialType).toEqual('createdAt')
    expect(definitions['updatedAtAttribute']._specialType).toEqual('updatedAt')
  })
})
