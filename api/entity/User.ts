import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  name?: string;

  @Field()
  @Property({ required: true, unique: true })
  email: string;

  @Field()
  @Property({ required: true, trim: true })
  @MinLength(8)
  @MaxLength(12)
  password: string;

  @Field()
  @Property({ required: true })
  avatar?: string;

  @Field()
  @Property({ default: new Date(), required: true })
  registrationDate: Date;

  @Field()
  @Property()
  role?: string;
}

export const UserModel = getModelForClass(User);
