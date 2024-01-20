
<h1 align="center">dynamoose-decorator</h1>

this library provides decorators to enhance the usability of dynamoose, a node.js object data modeling library for AWS DynamoDB.

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

## Version

major and middle versions of this package follow dynamoose, and the minor version follows dynamoose multiplied by 10.

| dyanmoose | dynamoose-decorator |
| --- | --- |
| 4.0.0 | 4.0.0 |
| 3.3.0 | 3.3.0 |
| 3.2.1 | 3.2.10 |
| 3.2.0 | 3.2.0 |

## Usage

```typescript
import { randomUUID } from 'crypto'
import { Attribute, CreatedAt, Enum, HashKey, Model, Storage, getModel, UpdatedAt } from 'dynamoose-decorator'
import { Item } from 'dynamoose/dist/Item'

const Status = {
  Shipped: 'Shipped',
  Unshipped: 'Unshipped',
  Canceled: 'Canceled',
} as const

type Status = keyof typeof Status

@Model()
export class OrderHistory extends Item {
  @HashKey()
  @Attribute()
  id!: string

  @Attribute()
  price!: number

  @Enum(Object.keys(Status))
  @Attribute()
  status!: Status

  @Storage('iso')
  @Attribute()
  shipmentAt?: Date

  @Storage('milliseconds')
  @CreatedAt()
  createdAt!: Date

  @Storage('milliseconds')
  @UpdatedAt()
  updatedAt!: Date
}

const OrderHistoryModel = getModel(OrderHistory)

;(async () => {
  // create
  const orderHistory = await OrderHistoryModel.create({
    id: randomUUID(),
    price: 99.99,
    status: Status.Unshipped,
  })

  // update
  orderHistory.status = Status.Shipped
  orderHistory.shipmentAt = new Date()
  await orderHistory.save()

  // delete
  await orderHistory.delete()
})()
```

### People

author and maintainer is [jinseok0](https://github.com/jinseok0) and [changmyeong](https://github.com/changmyeong)

### License

[MIT](LICENSE)
