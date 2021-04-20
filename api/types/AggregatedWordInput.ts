import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

import { AggregatedWord } from '../entity/AggregatedWord';

@InputType()
export class AggregatedWordInput implements Partial<AggregatedWord> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  group?: number;

  @Field({ nullable: true })
  repeat?: number;

  @Field({ nullable: true })
  rightAnswers?: number;

  @Field({ nullable: true })
  complexity?: boolean;

  @Field({ nullable: true })
  deleted?: boolean;

  @Field({ nullable: true })
  studied?: boolean;

  @Field({ nullable: true })
  word?: ObjectId;
}
