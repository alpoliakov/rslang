import { ObjectId } from 'mongodb';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';

import { OptionalStatistic, Statistic, StatisticModel } from '../entity/Statistic';
import { StatisticObject } from '../entity/Statistic';
import { User, UserModel } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { MyContext } from '../types/MyContext';
import { StatisticInput } from '../types/StatisticInput';

@Resolver(() => Statistic)
export class StatisticResolver {
  @Query(() => Statistic, { nullable: true })
  @UseMiddleware(isAuth)
  statistic(@Ctx() ctx: MyContext) {
    return StatisticModel.findOne({ user: ctx.res.locals.userId });
  }

  @Mutation(() => Statistic)
  @UseMiddleware(isAuth)
  async editStatistic(
    @Arg('input') statisticInput: StatisticInput,
    @Ctx() ctx: MyContext,
  ): Promise<Statistic> {
    const {
      globalRate,
      wordsCount,
      localRate,
      rightAnswers,
      wordsCountSavanna,
      rightAnswersSavanna,
      seriesSavanna,
      wordsCountCall,
      rightAnswersCall,
      seriesCall,
      wordsCountSprint,
      rightAnswersSprint,
      seriesSprint,
      wordsCountNew,
      rightAnswersNew,
      seriesNew,
    } = statisticInput;

    const savanna = {
      wordsCountSavanna,
      rightAnswersSavanna,
      seriesSavanna,
    };
    const audioCall = {
      wordsCountCall,
      rightAnswersCall,
      seriesCall,
    };
    const sprint = {
      wordsCountSprint,
      rightAnswersSprint,
      seriesSprint,
    };
    const newGame = {
      wordsCountNew,
      rightAnswersNew,
      seriesNew,
    };

    const optional = { wordsCount, rightAnswers, localRate, savanna, audioCall, sprint, newGame };

    const statistic = await StatisticModel.findOneAndUpdate(
      { user: ctx.res.locals.userId },
      {
        optional: { ...optional } as OptionalStatistic,
        globalRate,
      },
      { runValidators: true, new: true },
    );

    if (!statistic) {
      throw new Error('Statistic not found');
    }

    return statistic;
  }

  @Mutation(() => Statistic)
  @UseMiddleware(isAuth)
  async clearDayStatistic(@Ctx() ctx: MyContext): Promise<Statistic> {
    // const { optional } = await StatisticModel.findOne({ user: ctx.res.locals.userId });
    const data = await StatisticModel.findOne({ user: ctx.res.locals.userId });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { optional } = data;

    const statistic = await StatisticModel.findOneAndUpdate(
      { user: ctx.res.locals.userId },
      {
        $push: {
          statisticPerDay: {
            countWords: optional.wordsCount,
            date: optional.createDate,
          } as StatisticObject,
        },
        optional: {
          wordsCount: 0,
          rightAnswers: 0,
          localRate: 0,
          createDate: new Date(),
          savanna: {
            wordsCountSavanna: 0,
            rightAnswersSavanna: 0,
            seriesSavanna: 0,
          },
          audioCall: {
            wordsCountCall: 0,
            rightAnswersCall: 0,
            seriesCall: 0,
          },
          sprint: {
            wordsCountSprint: 0,
            rightAnswersSprint: 0,
            seriesSprint: 0,
          },
          newGame: {
            wordsCountNew: 0,
            rightAnswersNew: 0,
            seriesNew: 0,
          },
        } as OptionalStatistic,
      },
      { runValidators: true, new: true },
    );

    if (!statistic) {
      throw new Error('Statistic not found');
    }

    return statistic;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteStatistic(
    @Arg('statisticId', () => ObjectIdScalar) statisticId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | undefined> {
    const deleted = await StatisticModel.findOneAndDelete({
      _id: statisticId,
      user: ctx.res.locals.userId,
    });

    if (!deleted) {
      throw new Error('Setting not found');
    }
    return true;
  }

  @FieldResolver()
  async user(@Root() statistic: Statistic): Promise<User | null> {
    return await UserModel.findById(statistic.user);
  }
}
