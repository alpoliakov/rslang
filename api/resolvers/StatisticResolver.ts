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

import { Statistic, StatisticModel } from '../entity/Statistic';
import { User, UserModel } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { MyContext } from '../types/MyContext';

@Resolver(() => Statistic)
export class StatisticResolver {
  @Query(() => Statistic, { nullable: true })
  @UseMiddleware(isAuth)
  statistic(@Ctx() ctx: MyContext) {
    return StatisticModel.findOne({ user: ctx.res.locals.userId });
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
