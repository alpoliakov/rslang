import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

import { Ref } from '../types/Ref';
import { User } from './User';

@ObjectType()
class OptionalStatistic {
  @Field()
  @Property({ nullable: true })
  title: string;

  @Field()
  @Property({ nullable: true })
  description: string;
}

@ObjectType()
export class Statistic {
  @Field()
  readonly _id: ObjectId;

  @Field(() => User)
  @Property({ ref: User, required: true })
  user: Ref<User>;

  @Field()
  @Property()
  learnedWords: number;

  @Field(() => OptionalStatistic)
  @Property({ required: false })
  optional: OptionalStatistic;
}

export const StatisticModel = getModelForClass(Statistic);
