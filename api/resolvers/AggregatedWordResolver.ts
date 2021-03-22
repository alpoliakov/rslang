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

import { AggregatedWord, AggregatedWordModel } from '../entity/AggregatedWord';
import { User, UserModel } from '../entity/User';
import { Word, WordModel } from '../entity/Word';
import { isAuth } from '../middleware/isAuth';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { AggregatedWordInput } from '../types/AggregatedWordInput';
import { MyContext } from '../types/MyContext';

@Resolver(() => AggregatedWord)
export class AggregatedWordResolver {
  @Query(() => AggregatedWord, { nullable: true })
  @UseMiddleware(isAuth)
  async aggregatedWord(
    @Arg('aggregatedWordId', () => ObjectIdScalar) aggregatedWordId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<AggregatedWord> {
    const result = await AggregatedWordModel.findOne({
      _id: aggregatedWordId,
      user: ctx.res.locals.userId,
    });

    if (!result) {
      throw new Error('Words not found');
    }

    return result;
  }

  @Query(() => [AggregatedWord], { nullable: true })
  @UseMiddleware(isAuth)
  async allAggregatedWords(@Ctx() ctx: MyContext) {
    const result = await AggregatedWordModel.find({ user: ctx.res.locals.userId });

    if (!result) {
      throw new Error('Words not found');
    }

    return result;
  }

  @Mutation(() => AggregatedWord)
  @UseMiddleware(isAuth)
  async createAggregatedWord(
    @Arg('input') aggregatedWordInput: AggregatedWordInput,
    @Ctx() ctx: MyContext,
  ): Promise<AggregatedWord> {
    const { word } = aggregatedWordInput;
    const existingWord = await AggregatedWordModel.findOne({ word });

    if (existingWord) {
      throw new Error('Word already added');
    }

    const aggregatedWord = new AggregatedWordModel({
      ...aggregatedWordInput,
      user: ctx.res.locals.userId,
      optional: {
        repeat: aggregatedWordInput.repeat,
        title: aggregatedWordInput.title,
      },
    } as AggregatedWord);

    await aggregatedWord.save();

    return aggregatedWord;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAggregatedWord(
    @Arg('userWordId', () => ObjectIdScalar) aggregatedWordId: ObjectId,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | undefined> {
    const deleted = await AggregatedWordModel.findOneAndDelete({
      _id: aggregatedWordId,
      user: ctx.res.locals.userId,
    });
    if (!deleted) {
      throw new Error('User Word not found');
    }
    return true;
  }

  @FieldResolver()
  async user(@Root() aggregatedWord: AggregatedWord): Promise<User | null> {
    return await UserModel.findById(aggregatedWord.user);
  }

  @FieldResolver()
  async word(@Root() aggregatedWord: AggregatedWord): Promise<Word | null> {
    return await WordModel.findById(aggregatedWord.word);
  }
}