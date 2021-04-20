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

import { OptionalSettings, Settings, SettingsModel } from '../entity/Settings';
import { User, UserModel } from '../entity/User';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { MyContext } from '../types/MyContext';
import { SettingsInput } from '../types/SettingsInput';

@Resolver(() => Settings)
export class SettingsResolver {
  @Query(() => Settings, { nullable: true })
  @UseMiddleware(isAuth)
  settings(@Ctx() ctx: MyContext) {
    return SettingsModel.findOne({ user: ctx.res.locals.userId });
  }

  @Mutation(() => Settings)
  @UseMiddleware(isAuth)
  async editSettings(
    @Arg('input') settingsInput: SettingsInput,
    @Ctx() ctx: MyContext,
  ): Promise<Settings> {
    const { id, title, description, wordsPerDay } = settingsInput;
    const optional = { title, description };
    const settings = await SettingsModel.findOneAndUpdate(
      { _id: id, user: ctx.res.locals.userId },
      {
        optional: { ...optional } as OptionalSettings,
        wordsPerDay,
      },
      { runValidators: true, new: true },
    );
    if (!settings) {
      throw new Error('Context not found');
    }
    return settings;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteSettings(
    @Arg('settingId', () => ObjectIdScalar) settingsId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | undefined> {
    const deleted = await SettingsModel.findOneAndDelete({
      _id: settingsId,
      user: ctx.res.locals.userId,
    });

    if (!deleted) {
      throw new Error('Setting not found');
    }
    return true;
  }

  @FieldResolver()
  async user(@Root() settings: Settings): Promise<User | null> {
    return await UserModel.findById(settings.user);
  }
}
