import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

import { AggregatedWord } from '../entity/AggregatedWord';

@InputType()
export class AggregatedWordInput implements Partial<AggregatedWord> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field({ nullable: true })
  difficulty?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  word?: ObjectId;

  @Field({ nullable: true })
  repeat?: boolean;
}
