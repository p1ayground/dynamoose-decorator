import * as dynamoose from 'dynamoose'
import Internal from 'dynamoose/dist/Internal'
import { Item } from 'dynamoose/dist/Item'

import { Attribute } from '../attribute'
import { Schema, getSchema } from '../schema'

describe('schema', () => {
  it('should set schema settings using Schema and getSchema', async () => {
    @Schema({ saveUnknown: true })
    class TestSchema extends Item {
      @Attribute() id!: string
    }

    const testSchema = getSchema(TestSchema)
    const { settings } = testSchema.getInternalProperties(Internal.General.internalProperties)
    expect(settings).toEqual({ saveUnknown: true })
  })

  it('should dynamoose-decorator schema same instance to dynamoose schema', () => {
    @Schema()
    class TestSchema extends Item {
      @Attribute() id!: string
    }

    const testSchema = getSchema(TestSchema)
    expect(testSchema).toBeInstanceOf(dynamoose.Schema)
  })
})
