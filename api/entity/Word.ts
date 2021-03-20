import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { MaxLength } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Word {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  readonly group: number;

  @Field()
  @Property({ required: true })
  readonly page: number;

  @Field()
  @Property({ required: true })
  @MaxLength(100)
  readonly word: string;

  @Field()
  @Property({ required: false })
  @MaxLength(150)
  readonly image: string;

  @Field()
  @Property({ required: false })
  @MaxLength(150)
  readonly audio: string;

  @Field()
  @Property({ required: false })
  @MaxLength(150)
  readonly audioMeaning: string;

  @Field()
  @Property({ required: false })
  @MaxLength(150)
  readonly audioExample: string;

  @Field()
  @Property({ required: false })
  @MaxLength(300)
  readonly textMeaning: string;

  @Field()
  @Property({ required: false })
  @MaxLength(300)
  readonly textExample: string;

  @Field()
  @Property({ required: false })
  @MaxLength(100)
  readonly transcription: string;

  @Field()
  @Property({ required: true })
  readonly textExampleTranslate: string;

  @Field()
  @Property({ required: true })
  readonly textMeaningTranslate: string;

  @Field()
  @Property({ required: true })
  readonly wordTranslate: string;

  @Field()
  @Property()
  v?: number;
}

export const WordModel = getModelForClass(Word);
