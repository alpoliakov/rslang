import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

import { Statistic } from '../entity/Statistic';

@InputType()
export class StatisticInput implements Partial<Statistic> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field({ nullable: true })
  learnedWords?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
