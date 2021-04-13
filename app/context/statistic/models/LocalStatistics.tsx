type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

export interface GameField {
  wordsCount: number;
  rightAnswers: number;
  series: number;
}

export interface LocalStatistics {
  date: Date;
  wordsCount: number;
  rightAnswers: number;
  localRate: number;
  savanna: GameField;
  audioCall: GameField;
  sprint: GameField;
  newGame: GameField;
}
