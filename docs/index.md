## `@Attribute`(definition?: [AttributeDefinition](https://github.com/jinseok0/dynamoose-decorator/blob/v3.2.0/src/interface.ts#L33))

`definition` parameter takes the [Attribute Settings](https://dynamoosejs.com/guide/Schema#attribute-settings)

### `@Storage`(storage: "milliseconds" | "seconds" | "iso")

modify the `storage` attribute under `type` in `Attribute Setting`

## `@CreatedAt`(definition?: [AttributeDefinition](https://github.com/jinseok0/dynamoose-decorator/blob/v3.2.0/src/interface.ts#L33))

wrapped decorator on `@Attribute`, but add to `create` during `options` in `new dynamoose.Table(name, models[, options])` when the model is created

## `@UpdatedAt`(definition?: [AttributeDefinition](https://github.com/jinseok0/dynamoose-decorator/blob/v3.2.0/src/interface.ts#L33))

wrapped decorator on `@Attribute`, but add to `update` during `options` in `new dynamoose.Table(name, models[, options])` when the model is created

## `@Schema`(settings?: [SchemaSettings](https://github.com/jinseok0/dynamoose-decorator/blob/v3.2.0/src/interface.ts#L11))

`settings` parameter takes the `options` attribute of [new dynamoose.Schema(schema[, options])](https://dynamoosejs.com/guide/Schema#new-dynamooseschemaschema-options) second parameter

## `@Model`(options?: [ModelOption](https://github.com/dynamoose/dynamoose/blob/main/packages/dynamoose/lib/Model/index.ts#L108))

`options` parameter takes the `options` attribute of [new dynamoose.Table(name, models[, options])](https://dynamoosejs.com/guide/Table#new-dynamoosetablename-models-options) third parameter
