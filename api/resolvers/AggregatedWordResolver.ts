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

import {
  AggregatedWord,
  AggregatedWordModel,
  OptionalAggregatedWord,
} from '../entity/AggregatedWord';
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
    const result = await AggregatedWordModel.find({
      user: ctx.res.locals.userId,
    });

    if (!result) {
      throw new Error('Words not found');
    }

    return result;
  }

  @Query(() => [AggregatedWord], { nullable: true })
  @UseMiddleware(isAuth)
  async aggregatedWords(
    @Arg('input') aggregatedWordInput: AggregatedWordInput,
    @Ctx() ctx: MyContext,
  ) {
    const { group, page } = aggregatedWordInput;

    const result = await AggregatedWordModel.find({
      user: ctx.res.locals.userId,
      group,
      page,
    });

    if (!result) {
      throw new Error('Words not found');
    }

    return result;
  }

  @Query(() => [AggregatedWord], { nullable: true })
  @UseMiddleware(isAuth)
  async aggregatedWordsSearch(
    @Arg('input') aggregatedWordInput: AggregatedWordInput,
    @Ctx() ctx: MyContext,
  ) {
    const { group, complexity, studied, deleted } = aggregatedWordInput;
    const result = await AggregatedWordModel.find({
      user: ctx.res.locals.userId,
      group,
      deleted,
      complexity,
      studied,
    });

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
        rightAnswers: aggregatedWordInput.rightAnswers,
      },
    } as AggregatedWord);

    await aggregatedWord.save();

    return aggregatedWord;
  }

  @Mutation(() => AggregatedWord)
  @UseMiddleware(isAuth)
  async editAggregatedWord(
    @Arg('input') aggregatedWordInput: AggregatedWordInput,
    @Ctx() ctx: MyContext,
  ): Promise<AggregatedWord | null> {
    const { id, complexity, deleted, studied, rightAnswers, repeat } = aggregatedWordInput;
    const optional = { rightAnswers, repeat } as OptionalAggregatedWord;

    const aggregatedWord = AggregatedWordModel.findOneAndUpdate(
      { _id: id, user: ctx.res.locals.userId },
      {
        deleted,
        complexity,
        studied,
        optional,
      },
      { runValidators: true, new: true },
    );

    if (!aggregatedWord) {
      throw new Error('Aggregated word not found!');
    }

    return aggregatedWord;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAggregatedWord(
    @Arg('aggregatedWordId', () => ObjectIdScalar) aggregatedWordId: ObjectId,
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
