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

  describe('decorators without @Attribute', () => {
    class TestSchemaWithoutAttribute {
      @HashKey()
      id!: string

      @Required()
      email!: string

      @Index({ name: 'nameIndex' })
      name!: string

      @Default('default-company')
      company!: string

      @Enum(['active', 'inactive'])
      status!: string

      @CreatedAt()
      createdAt!: Date

      @UpdatedAt()
      updatedAt!: Date

      @Storage('iso')
      dateField!: Date

      @RangeKey()
      score!: number
    }

    it('should work without @Attribute decorator', () => {
      const targetInstance = new TestSchemaWithoutAttribute()
      const definitions = getAttributeDefinitions(targetInstance.constructor)

      expect(definitions['id']).toBeDefined()
      expect(definitions['id'].hashKey).toEqual(true)
      expect(definitions['id'].type).toBeDefined()

      expect(definitions['email']).toBeDefined()
      expect(definitions['email'].required).toEqual(true)
      expect(definitions['email'].type).toBeDefined()

      expect(definitions['name']).toBeDefined()
      expect(definitions['name'].index).toEqual({ name: 'nameIndex' })
      expect(definitions['name'].type).toBeDefined()

      expect(definitions['company']).toBeDefined()
      expect(definitions['company'].default).toEqual('default-company')
      expect(definitions['company'].type).toBeDefined()

      expect(definitions['status']).toBeDefined()
      expect(definitions['status'].enum).toEqual(['active', 'inactive'])
      expect(definitions['status'].type).toBeDefined()

      expect(definitions['createdAt']).toBeDefined()
      expect(definitions['createdAt']._specialType).toEqual('createdAt')
      expect(definitions['createdAt'].type).toBeDefined()

      expect(definitions['updatedAt']).toBeDefined()
      expect(definitions['updatedAt']._specialType).toEqual('updatedAt')
      expect(definitions['updatedAt'].type).toBeDefined()

      expect(definitions['dateField']).toBeDefined()
      expect(definitions['dateField'].type).toBeDefined()

      expect(definitions['score']).toBeDefined()
      expect(definitions['score'].rangeKey).toEqual(true)
      expect(definitions['score'].type).toBeDefined()
    })

    it('should work with mixed decorators (with and without @Attribute)', () => {
      class MixedSchema {
        @HashKey()
        id!: string

        @Required()
        @Attribute()
        email!: string

        @Index({ name: 'companyIndex' })
        company!: string
      }

      const targetInstance = new MixedSchema()
      const definitions = getAttributeDefinitions(targetInstance.constructor)

      expect(definitions['id']).toBeDefined()
      expect(definitions['id'].hashKey).toEqual(true)
      expect(definitions['id'].type).toBeDefined()

      expect(definitions['email']).toBeDefined()
      expect(definitions['email'].required).toEqual(true)
      expect(definitions['email'].type).toBeDefined()

      expect(definitions['company']).toBeDefined()
      expect(definitions['company'].index).toEqual({ name: 'companyIndex' })
      expect(definitions['company'].type).toBeDefined()
    })
  })
})
