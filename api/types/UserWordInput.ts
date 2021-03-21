import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

import { UserWord } from '../entity/UserWord';

@InputType()
export class UserWordInput implements Partial<UserWord> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field({ nullable: true })
  difficulty?: string;

  @Field({ nullable: true })
  title?: string;

  @Field()
  word: ObjectId;

  @Field({ nullable: true })
  repeat?: boolean;
}
