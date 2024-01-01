
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

> minor version of this library corresponds to 10 times the minor version of dynamoose.
>
> ex) dynamoose@3.2.1 -> dynamoose-decorator@3.2.10

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

author and maintainer is [jinseok0](https://github.com/jinseok0)

### License

[MIT](LICENSE)
