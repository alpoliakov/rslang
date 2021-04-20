import { Field, InputType } from 'type-graphql';

import { Word } from '../entity/Word';

@InputType()
export class WordInput implements Partial<Word> {
  @Field({ nullable: true })
  group?: number;

  @Field({ nullable: true })
  page?: number;
}
