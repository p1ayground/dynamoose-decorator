
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

| dyanmoose | dynamoose-decorator (latest) |
| --- | --- |
| 4.0.0 | 4.0.2 |
| 3.3.0 | 3.3.2 |
| 3.2.1 | 3.2.12 |
| 3.2.0 | 3.2.2 |

## Usage

```typescript
import { Item } from 'dynamoose/dist/Item.js';
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
class User extends Item {
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

export const UserModel = getModel(User)

const user = new UserModel();
user.id = 'bf02318d-4029-4474-a7a0-e957eb176d75';
user.email = 'test@dynamoose.com';
user.name = 'DYNAMOOSE';
user.company = 'Amazon';
user.score = 3;

await user.save();
```

### People

author and maintainer is [jinseok0](https://github.com/jinseok0) and [changmyeong](https://github.com/changmyeong)

### License

[MIT](LICENSE)
