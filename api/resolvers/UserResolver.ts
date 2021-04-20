import { ObjectId } from 'mongodb';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';

import { AggregatedWordModel } from '../entity/AggregatedWord';
import { SettingsModel } from '../entity/Settings';
import { StatisticModel } from '../entity/Statistic';
import { User, UserModel } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { EditUserInput } from '../types/EditUserInput';
import { MyContext } from '../types/MyContext';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('userId', () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId);
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async currentUser(
    @Ctx()
    ctx: MyContext,
  ): Promise<User | null> {
    return await UserModel.findById(ctx.res.locals.userId);
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async editUser(@Arg('input') settingsInput: EditUserInput, @Ctx() ctx: MyContext): Promise<User> {
    const { name, email, avatar } = settingsInput;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser && existingUser._id != ctx.res.locals.userId) {
      throw new Error('Email already in use');
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: ctx.res.locals.userId },
      {
        name,
        email,
        avatar,
      },
      { runValidators: true, new: true },
    );

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Arg('userId', () => ObjectIdScalar) userId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | undefined> {
    const deletedUser = await UserModel.findOneAndDelete({
      _id: userId,
    });

    await SettingsModel.findOneAndDelete({
      user: ctx.res.locals.userId,
    });

    await StatisticModel.findOneAndDelete({
      user: ctx.res.locals.userId,
    });

    await AggregatedWordModel.deleteMany({
      user: ctx.res.locals.userId,
    });

    if (!deletedUser) {
      throw new Error('User not found');
    }

    return true;
  }
}
