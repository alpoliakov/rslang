import { Field, InputType } from 'type-graphql';

import { User } from '../entity/User';

@InputType()
export class EditUserInput implements Partial<User> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  avatar?: string;
}
