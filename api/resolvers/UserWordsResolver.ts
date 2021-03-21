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

import { User, UserModel } from '../entity/User';
import { UserWord, UserWordModel } from '../entity/UserWord';
import { Word, WordModel } from '../entity/Word';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { MyContext } from '../types/MyContext';
import { UserWordInput } from '../types/UserWordInput';

@Resolver(() => UserWord)
export class UserWordsResolver {
  @Query(() => UserWord, { nullable: true })
  @UseMiddleware(isAuth)
  async userWord(
    @Arg('userWordId', () => ObjectIdScalar) userWordId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<UserWord> {
    const result = await UserWordModel.findOne({
      _id: userWordId,
      user: ctx.res.locals.userId,
    });

    if (!result) {
      throw new Error('Words not found');
    }

    return result;
  }

  @Query(() => [UserWord], { nullable: true })
  @UseMiddleware(isAuth)
  async allUserWords(@Ctx() ctx: MyContext) {
    const result = await UserWordModel.find({ user: ctx.res.locals.userId });

    if (!result) {
      throw new Error('Words not found');
    }

    return result;
  }

  @Mutation(() => UserWord)
  @UseMiddleware(isAuth)
  async createUserWord(
    @Arg('input') userWordInput: UserWordInput,
    @Ctx() ctx: MyContext,
  ): Promise<UserWord> {
    const { word } = userWordInput;
    const existingWord = await UserWordModel.findOne({ word });

    if (existingWord) {
      throw new Error('Word already added');
    }

    const userWord = new UserWordModel({
      ...userWordInput,
      user: ctx.res.locals.userId,
      optional: {
        repeat: userWordInput.repeat,
        title: userWordInput.title,
      },
    } as UserWord);

    await userWord.save();

    return userWord;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUserWord(
    @Arg('userWordId', () => ObjectIdScalar) userWordId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | undefined> {
    const deleted = await UserWordModel.findOneAndDelete({
      _id: userWordId,
      user: ctx.res.locals.userId,
    });
    if (!deleted) {
      throw new Error('User Word not found');
    }
    return true;
  }

  @FieldResolver()
  async user(@Root() userWord: UserWord): Promise<User | null> {
    return await UserModel.findById(userWord.user);
  }

  @FieldResolver()
  async word(@Root() userWord: UserWord): Promise<Word | null> {
    return await WordModel.findById(userWord.word);
  }
}
