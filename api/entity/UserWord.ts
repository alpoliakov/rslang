import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

import { Ref } from '../types/Ref';
import { User } from './User';
import { Word } from './Word';

@ObjectType()
export class OptionalUserWord {
  @Field()
  @Property({ nullable: true })
  title: string;

  @Field()
  @Property({ nullable: true })
  repeat: boolean;
}

@ObjectType()
export class UserWord {
  @Field()
  readonly _id: ObjectId;

  @Field(() => OptionalUserWord)
  @Property({ required: false })
  optional: OptionalUserWord;

  @Field()
  @Property({ required: false })
  difficulty: string;

  @Field(() => Word)
  @Property({ ref: Word, required: true })
  word?: Ref<Word>;

  @Field(() => User)
  @Property({ ref: User, required: true })
  user?: Ref<User>;
}

export const UserWordModel = getModelForClass(UserWord);
