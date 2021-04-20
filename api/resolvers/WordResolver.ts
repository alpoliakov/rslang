import { ObjectId } from 'mongodb';
import { Arg, Query, Resolver } from 'type-graphql';

import { Word, WordModel } from '../entity/Word';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { WordInput } from '../types/WordInput';

@Resolver(() => Word)
export class WordResolver {
  @Query(() => [Word], { nullable: true })
  async allWords() {
    const result = await WordModel.find({});
    return result;
  }

  @Query(() => Word, { nullable: true })
  async word(@Arg('wordId', () => ObjectIdScalar) wordId: ObjectId) {
    const result = await WordModel.findById(wordId);

    if (!result) {
      throw new Error('Word not found');
    }

    return result;
  }

  @Query(() => [Word], { nullable: true })
  async words(@Arg('input') wordInput: WordInput) {
    const { group, page } = wordInput;
    const result = await WordModel.find({ group, page });

    if (!result) {
      throw new Error('Words not found');
    }

    return result;
  }
}
