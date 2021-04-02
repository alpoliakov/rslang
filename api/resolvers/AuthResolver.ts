import '../server/env';
import 'reflect-metadata';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Arg, Mutation, Resolver } from 'type-graphql';

import { AggregatedWord, AggregatedWordModel } from '../entity/AggregatedWord';
import { Settings, SettingsModel } from '../entity/Settings';
import { Statistic, StatisticModel } from '../entity/Statistic';
import { UserModel } from '../entity/User';
import { WordModel } from '../entity/Word';
import { AuthInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input')
    { name, email, password, avatar }: AuthInput,
  ): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const role = 'user';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      avatar,
      role,
    });
    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'MyipInhpvw4LJcUr');

    const settings = await new SettingsModel({
      wordsPerDay: 0,
      user: user.id,
      optional: {
        title: `${user.name} setting`,
        description: 'Test description setting',
      },
    } as Settings);

    const statistic = await new StatisticModel({
      learnedWords: 0,
      user: user.id,
      optional: {
        title: `${user.name} statistic`,
        description: 'Test description statistic',
      },
    } as Statistic);

    const words = await WordModel.find({});

    await settings.save();
    await statistic.save();

    const createAggregatedWords = async (word: any) => {
      const aggregatedWord = await new AggregatedWordModel({
        user: user.id,
        word: word._id,
        page: word.page,
        group: word.group,
        complexity: false,
        deleted: false,
        studied: false,
        optional: {
          repeat: 0,
          rightAnswers: 0,
        },
      } as AggregatedWord);

      await aggregatedWord.save();
    };

    for (const word of words) {
      await createAggregatedWords(word);
    }

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('input') { email, password }: AuthInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid login');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid login');
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'MyipInhpvw4LJcUr');

    return { user, token };
  }
}
