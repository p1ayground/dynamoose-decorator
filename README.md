
<h1 align="center">dynamoose-decorator</h1>

This library provides decorators to enhance the usability of dynamoose, a Node.js object data modeling library for AWS DynamoDB.

```typescript
import { Item } from 'dynamoose/dist/Item';
import {
  HashKey,
  Attribute,
  Required,
  Index,
  CreatedAt,
  UpdatedAt,
  Model,
  Storage,
  getModel,
} from 'dynamoose-decorator';

@Model({ throughput: 'ON_DEMAND', waitForActive: false })
@Schema()
class UserSchema extends Item {
  @HashKey()
  @Attribute()
  id: string;

  @Index({ name: 'emailIndex' })
  @Required()
  @Attribute()
  email: string;

  @Index({ name: 'nameIndex' })
  @Required()
  @Attribute()
  name: string;

  @Index({ name: 'companyAndScoreIndex', rangeKey: 'score' })
  @Attribute()
  company: string;

  @Attribute()
  score: number;

  @Storage('milliseconds')
  @CreatedAt()
  @Attribute()
  createdAt: Date;

  @Storage('milliseconds')
  @UpdatedAt()
  @Attribute()
  updatedAt: Date;
}

export const UserModel = getModel(UserSchema)

const user = new UserModel();
user.id = 'bf02318d-4029-4474-a7a0-e957eb176d75';
user.email = 'test@dynamoose.com';
user.name = 'DYNAMOOSE';
user.company = 'Amazon';
user.score = 3;

await user.save();
```

## Getting started

install using `npm`

```bash
npm install dynamoose-decorator dynamoose
```

install using `yarn`

```bash
yarn add dynamoose-decorator dynamoose
```

install using `pnpm`

```bash
pnpm add dynamoose-decorator dynamoose
```

and then modify the tsconfig.json
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
}
```

## Attribute
### `@Attribute`
Define attribute for a Dynamoose model.  

⚠️ **Note:** Ensure that all attributes in your Dynamoose model are decorated with `@Attribute` for the settings to take effect.
```typescript
import { Attribute } from 'dynamoose-decorator';

@Attribute()
name: string;
```

### `@HashKey`
You can set this decorator to overwrite what the Hash Key for the Model will be.
Hash Key is commonly called a Partition Key in the AWS Documentation.

⚠️ **Note:** Hash keys can only be specified for attributes of types Number, String, and Binary.
```typescript
import { HashKey, Attribute } from 'dynamoose-decorator';

@HashKey()
@Attribute()
id: string;
```

### `@RangeKey`
You can set this decorator to overwrite what the Range Key for the Model will be. By default the `@RangeKey` won't exist.
Range Key is commonly called a Sort Key in the AWS Documentation.

```typescript
import { RangeKey, Attribute } from 'dynamoose-decorator';

@RangeKey()
@Attribute()
score: number;
```

### `@Required`
You can set this decorator to be required when saving items to DynamoDB. By default this setting is `false`.

```typescript
import { Required, Attribute } from 'dynamoose-decorator';

@Required()
@Attribute()
email: string;
```


### `@Default`
It is decorate [Dynamoose default](https://dynamoosejs.com/guide/Schema#default-value--function--async-function). You can set this decorator for an attribute that will be applied upon save if the given attribute value is null or undefined. The value for the default property can either be a value or a function that will be executed when needed that should return the default value. By default there is no default value for attributes.

Default values will only be applied if the parent object exists. This means for values where you apply a default value to a nested attribute, it will only be applied if the parent object exists. If you do not want this behavior, consider setting a default value for the parent object to an empty object ({}) or an empty array ([]).
```typescript
import { Default, Attribute } from 'dynamoose-decorator';

@Default(5)
@Attribute()
age: number;

@Default(async () => {
  const response = await axios("https://myurl.com/config.json").data;
  return response.defaults.age;
})
@Attribute()
state: string;
```

### `@ForceDefault`
You can set this property to always use the default value, even if a value is already set. This can be used for data that will be used as sort or secondary indexes. The default for this property is false.
```typescript
import { ForceDefault, Default, Attribute } from 'dynamoose-decorator';

@ForceDefault()
@Default(5)
@Attribute()
age: number;
```


## `@Enum`
You can set an attribute to have an enum array, which means it must match one of the values specified in the enum array. By default this setting is undefined and not set to anything.

This property is not a replacement for required. If the value is undefined or null, the enum will not be checked. If you want to require the property and also have an enum you must use both enum & required.
```typescript
import { Enum, Attribute } from 'dynamoose-decorator';

@Enum(['amazon', 'apple'])
company: string;
```


### `@Storage`
Set storage settings for an attribute of type Date.  
By default this setting is `milliseconds`.
```typescript
import { Storage, Attribute } from 'dynamoose-decorator';

// Stored as a timestamp in DynamoDB.
// It is saved as number type.
@Storage('milliseconds')
@Attribute()
timestamp: Date;

// Stored as a iso date in DynamoDB.
// It is saved as string type.
@Storage('iso')
@Attribute()
isodate: Date;
```

### `@CreatedAt`, `@UpdatedAt`
Special column that is automatically set to the entity's insertion or update time. You don't need to write a value into this column.

⚠️ **Note:** These features are not features of DynamoDB. it will set by the Dynamoose.

```typescript
import { CreatedAt, UpdatedAt, Storage, Attribute } from 'dynamoose-decorator';

@CreatedAt()
@Attribute()
createdAt: Date;

@UpdatedAt()
@Attribute()
updatedAt: Date;

@Storage('iso')
@CreatedAt()
@Attribute()
createdIsoDate: Date;

@Storage('iso')
@UpdatedAt()
@Attribute()
updatedIsoDate: Date;
```

## Schema
It is decorate Dynamoose schema.  
Please refer to the [Dynamoose documentation](https://dynamoosejs.com/guide/Schema#new-dynamooseschemaschema-options) for options.

```typescript
import { Schema } from 'dynamoose-decorator';
import { Item } from 'dynamoose/dist/Item';

@Schema({ saveUnknown: true })
class UserSchema extends Item {
  // attributes ..
}
```

## Model
You can set this decorator to [table options](https://dynamoosejs.com/guide/Table#new-dynamoosetablename-models-options).  
However, we automatically set the name of the table to the class name. If you want to change the table name, use the `tableName` option.

You must use the `Schema` class by converting it to a Dynamoose Model object through the `getModel` function.

```typescript
import { Schema, getModel, HashKey, RangeKey, Attribute } from 'dynamoose-decorator';
import { Item } from 'dynamoose/dist/Item';

// The table name for this entity is `User`.
@Model({ throughput: 'ON_DEMAND' })
@Schema()
class UserSchema {
  @HashKey()
  @Attribute()
  id: string;

  @RangeKey()
  @Attribute()
  score: number;
}

// Set the table name you want!
@Model({ tableName: 'prod-Order', throughput: { read: 1, write: 1 } })
@Schema()
class OrderSchema {

}

// Convert to Dynamoose Model
const UserModel = getModel(UserSchema);
const OrderModel = getModel(OrderSchema);

// Same use as Dynamoose!
await UserModel.create({
  id: 'hello',
  score: 100,
});

const user = new UserModel();
user.id = 'world';
user.score = 200;
await user.save();
```


## Maintainer
- [jinseok0](https://github.com/jinseok0)
- [changmyeong](https://github.com/changmyeong)