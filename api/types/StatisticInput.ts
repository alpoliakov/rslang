import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

import { Statistic } from '../entity/Statistic';

@InputType()
export class StatisticInput implements Partial<Statistic> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field({ nullable: true })
  globalRate?: number;

  @Field({ nullable: true })
  wordsCount?: number;

  @Field({ nullable: true })
  localRate?: number;

  @Field({ nullable: true })
  rightAnswers?: number;

  @Field({ nullable: true })
  wordsCountSavanna?: number;

  @Field({ nullable: true })
  rightAnswersSavanna?: number;

  @Field({ nullable: true })
  seriesSavanna?: number;

  @Field({ nullable: true })
  wordsCountCall?: number;

  @Field({ nullable: true })
  rightAnswersCall?: number;

  @Field({ nullable: true })
  seriesCall?: number;

  @Field({ nullable: true })
  wordsCountSprint?: number;

  @Field({ nullable: true })
  rightAnswersSprint?: number;

  @Field({ nullable: true })
  seriesSprint?: number;

  @Field({ nullable: true })
  wordsCountNew?: number;

  @Field({ nullable: true })
  rightAnswersNew?: number;

  @Field({ nullable: true })
  seriesNew?: number;
}
