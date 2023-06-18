
<h1 align="center">dynamoose-decorator</h1>

inspired by sequelize-typescript and @nestjs/mongoose

## Getting started

install using `npm`

```bash
npm install dynamoose-decorator dynamoose
```

or install using `yarn`

```bash
yarn add dynamoose-decorator dynamoose
```

or install using `pnpm`

```bash
pnpm add dynamoose-decorator dynamoose
```

> this package follows the version of dynamose

## Usage

```typescript
import { randomUUID } from "crypto";
import {
  Attribute,
  CreatedAt,
  Model,
  UpdatedAt,
  Storage,
  getModel,
} from "dynamoose-decorator";
import { Item } from "dynamoose/dist/Item";

@Model()
export class OrderHistory extends Item {
  @Attribute({
    hashKey: true,
  })
  id!: string;

  @Attribute({
    required: true,
  })
  price!: number;

  @Attribute({
    enum: Object.keys(Status),
  })
  status!: Status;

  @Storage("iso")
  @Attribute()
  shipmentAt?: Date;

  @Storage("milliseconds")
  @CreatedAt()
  createdAt!: Date;

  @Storage("milliseconds")
  @UpdatedAt()
  updatedAt!: Date;
}

const OrderHistoryModel = getModel(OrderHistory);

(async () => {
  // create
  const orderHistory = await OrderHistoryModel.create({
    id: randomUUID(),
    price: 99.99,
    status: Status.Unshipped,
  });

  // update
  orderHistory.status = Status.Shipped;
  orderHistory.shipmentAt = new Date();
  await orderHistory.save();

  // delete
  await orderHistory.delete();
})();

const Status = {
  Shipped: "Shipped",
  Unshipped: "Unshipped",
  Canceled: "Canceled",
} as const;

type Status = keyof typeof Status;
```

[more documents](https://github.com/jinseok0/dynamoose-decorator/blob/v3.2.0/docs/index.md)

### People

author and maintainer is [jinseok0](https://github.com/jinseok0)

### License

[MIT](LICENSE)
