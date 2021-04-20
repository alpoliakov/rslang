import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

import { Ref } from '../types/Ref';
import { User } from './User';

@ObjectType()
export class OptionalSettings {
  @Field({ nullable: true })
  @Property({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string;
}

@ObjectType()
export class Settings {
  @Field()
  readonly _id: ObjectId;

  @Field(() => User)
  @Property({ ref: User, required: true })
  user: Ref<User>;

  @Field()
  @Property()
  wordsPerDay: number;

  @Field(() => OptionalSettings)
  @Property({ required: false })
  optional: OptionalSettings;
}

export const SettingsModel = getModelForClass(Settings);
