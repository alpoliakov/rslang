import { GraphQLSchema } from 'graphql';
import { ObjectId } from 'mongodb';
import path from 'path';
import { buildSchema } from 'type-graphql';

import { TypegooseMiddleware } from '../middleware/typegoose';
import { AuthResolver } from '../resolvers/AuthResolver';
import { SettingsResolver } from '../resolvers/SettingsResolver';
import { StatisticResolver } from '../resolvers/StatisticResolver';
import { UserResolver } from '../resolvers/UserResolver';
import { WordResolver } from '../resolvers/WordResolver';
import { ObjectIdScalar } from './object-id.scalar';

export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver, SettingsResolver, StatisticResolver, WordResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
  return schema;
}
