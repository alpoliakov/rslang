import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, Float, ObjectType } from 'type-graphql';

import { Ref } from '../types/Ref';
import { User } from './User';
import { Word } from './Word';

@ObjectType()
export class OptionalAggregatedWord {
  @Field()
  @Property({ nullable: true })
  repeat: number;

  @Field()
  @Property({ nullable: true })
  rightAnswers: number;

  @Field(() => Float, { nullable: true })
  wrongAnswers(): number | null {
    const repeat = +this.repeat;
    const rightAnswers = +this.rightAnswers;
    return repeat - rightAnswers;
  }
}

@ObjectType()
export class AggregatedWord {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  group: number;

  @Field()
  @Property({ required: true })
  page: number;

  @Field(() => OptionalAggregatedWord)
  @Property({ required: false })
  optional: OptionalAggregatedWord;

  @Field()
  @Property({ required: false })
  complexity: boolean;

  @Field()
  @Property({ required: false })
  deleted: boolean;

  @Field()
  @Property({ nullable: true })
  studied: boolean;

  @Field(() => Word)
  @Property({ ref: Word, required: true })
  word: Ref<Word>;

  @Field(() => User)
  @Property({ ref: User, required: true })
  user: Ref<User>;
}

export const AggregatedWordModel = getModelForClass(AggregatedWord);
