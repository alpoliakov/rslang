import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';

import { Settings } from '../entity/Settings';

@InputType()
export class SettingsInput implements Partial<Settings> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field({ nullable: true })
  wordsPerDay?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
