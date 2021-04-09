import {
  getModelForClass,
  prop as Property,
  setGlobalOptions,
  Severity,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, Float, ObjectType } from 'type-graphql';

import { Ref } from '../types/Ref';
import { User } from './User';

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });

@ObjectType()
export class StatisticObject {
  @Field({ nullable: true })
  @Property({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true })
  countWords?: number;
}

@ObjectType()
export class SavannaGameStatistic {
  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  wordsCountSavanna: number;

  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  rightAnswersSavanna: number;

  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  seriesSavanna: number;

  @Field(() => Float, { nullable: true })
  percentsRightSavanna(): number | null {
    const wordsCount = +this.wordsCountSavanna;
    const rightAnswers = +this.rightAnswersSavanna;
    if (wordsCount === 0) return 0;
    return (rightAnswers / wordsCount) * 100;
  }
}

@ObjectType()
export class CallGameStatistic {
  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  wordsCountCall: number;

  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  rightAnswersCall: number;

  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  seriesCall: number;

  @Field(() => Float, { nullable: true })
  percentsRightCall(): number | null {
    const wordsCount = +this.wordsCountCall;
    const rightAnswers = +this.rightAnswersCall;
    if (wordsCount === 0) return 0;
    return (rightAnswers / wordsCount) * 100;
  }
}

@ObjectType()
export class SprintGameStatistic {
  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  wordsCountSprint: number;

  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  rightAnswersSprint: number;

  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  seriesSprint: number;

  @Field(() => Float, { nullable: true })
  percentsRightSprint(): number | null {
    const wordsCount = +this.wordsCountSprint;
    const rightAnswers = +this.rightAnswersSprint;
    if (wordsCount === 0) return 0;
    return (rightAnswers / wordsCount) * 100;
  }
}

@ObjectType()
export class NewGameStatistic {
  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  wordsCountNew: number;

  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  rightAnswersNew: number;

  @Field({ defaultValue: 0 })
  @Property({ nullable: true })
  seriesNew: number;

  @Field(() => Float, { nullable: true })
  percentsRightNew(): number | null {
    const wordsCount = +this.wordsCountNew;
    const rightAnswers = +this.rightAnswersNew;
    if (wordsCount === 0) return 0;
    return (rightAnswers / wordsCount) * 100;
  }
}

@ObjectType()
export class OptionalStatistic {
  @Field()
  @Property({ nullable: true })
  wordsCount: number;

  @Field()
  @Property({ nullable: true })
  rightAnswers: number;

  @Field(() => Float, { nullable: true })
  percentsRight(): number | null {
    const wordsCount = +this.wordsCount;
    const rightAnswers = +this.rightAnswers;
    if (wordsCount === 0) return 0;
    return (rightAnswers / wordsCount) * 100;
  }

  @Field()
  @Property({ default: new Date(), required: true })
  createDate: Date;

  @Field(() => SavannaGameStatistic, { nullable: true })
  @Property({ required: false })
  savanna?: SavannaGameStatistic;

  @Field(() => CallGameStatistic, { nullable: true })
  @Property({ required: false })
  audioCall?: CallGameStatistic;

  @Field(() => SprintGameStatistic, { nullable: true })
  @Property({ required: false })
  sprint?: SprintGameStatistic;

  @Field(() => NewGameStatistic, { nullable: true })
  @Property({ required: false })
  newGame?: NewGameStatistic;
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

  @Field(() => [StatisticObject])
  @Property({ required: true, nullable: true })
  statisticPerDay?: StatisticObject[];
}

export const StatisticModel = getModelForClass(Statistic);
