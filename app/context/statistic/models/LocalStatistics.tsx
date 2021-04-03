type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

export interface GameField {
  wordsCount: number;
  rightAnswers: number;
  series: number;
}

export interface LocalStatistics {
  wordsCount: number;
  rightAnswers: number;
  words?: [string] | [];
  savanna: GameField;
  audioCall: GameField;
  sprint: GameField;
  newGame: GameField;
}
