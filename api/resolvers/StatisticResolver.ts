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
    const { id, title, description, learnedWords } = statisticInput;
    const optional = { title, description };

    const statistic = await StatisticModel.findOneAndUpdate(
      { _id: id, user: ctx.res.locals.userId },
      {
        optional: { ...optional } as OptionalStatistic,
        learnedWords,
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
