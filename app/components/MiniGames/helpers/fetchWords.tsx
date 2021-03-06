import { WORDS_IN_PAGE } from '../../../constants/index';
import { initializeApollo } from '../../../lib/apollo';
import { AggregatedWordDocument } from '../../../lib/graphql/aggregatedWord.graphql';
import { AggregatedWordsDocument } from '../../../lib/graphql/aggregatedWords.graphql';
import { AggregatedWordsComplexityDocument } from '../../../lib/graphql/aggregatedWordsComplexity.graphql';
import { AggregatedWordsDeletedDocument } from '../../../lib/graphql/aggregatedWordsDeleted.graphql';
import { AggregatedWordsStudiedDocument } from '../../../lib/graphql/aggregatedWordsStudied.graphql';
import { StatisticDocument } from '../../../lib/graphql/statistic.graphql';
import { WordsDocument } from '../../../lib/graphql/words.graphql';
import { toMatrix } from '../helpers/utils';

export const fetchCurrentWords = async (group, page, setLoading, setWords) => {
  if (group === '') return;
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: WordsDocument,
    variables: { group: Number(group), page },
    fetchPolicy: 'network-only',
  });

  let words = [...data.words];
  if (words.length < 10 && page !== 0) {
    const { data } = await apollo.query({
      query: WordsDocument,
      variables: {
        input: { group: Number(group), page: page - 1 },
        fetchPolicy: 'network-only',
      },
    });
    words = [...words, ...data.words];
  }
  await setWords(words);
  if (words) {
    setLoading(false);
  }
};

export const fetchCurrentWordsAudiocall = async (group, page, setLoading, setWords) => {
  if (group === '') return;
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: WordsDocument,
    variables: { group: Number(group), page },
    fetchPolicy: 'network-only',
  });

  let words = [...data.words];
  if (words.length < 10 && page !== 0) {
    const { data } = await apollo.query({
      query: WordsDocument,
      variables: {
        input: { group: Number(group), page: page - 1 },
        fetchPolicy: 'network-only',
      },
    });
    words = [...words, ...data.words];
  }
  await setWords(words.splice(9, 10));

  if (words) {
    setLoading(false);
  }
};

export const fetchCurrentWord = async (id) => {
  const apollo = initializeApollo();
  try {
    const { data } = await apollo.query({
      query: AggregatedWordDocument,
      variables: { aggregatedWordId: id },
      fetchPolicy: 'network-only',
    });

    if (data.aggregatedWord._id) {
      return data.aggregatedWord;
    }
  } catch (err) {
    console.error(err.message);
  }
};

export const editWord = async (
  { id, repeat, rightAnswers, studied },
  complexity,
  deleted,
  editAggregatedWord,
) => {
  try {
    const { data } = await editAggregatedWord({
      variables: { input: { id, complexity, deleted, repeat, rightAnswers, studied } },
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const userFetch = async (group, page, setLoading, setWords) => {
  setLoading(true);
  const apollo = initializeApollo();

  const { data } = await apollo.query({
    query: AggregatedWordsDocument,
    variables: {
      input: { group: Number(group), page },
      fetchPolicy: 'network-only',
    },
  });
  let words = [...data.aggregatedWords];
  if (words.length < 20 && page !== 0) {
    const { data } = await apollo.query({
      query: AggregatedWordsDocument,
      variables: {
        input: { group: Number(group), page: page - 1 },
        fetchPolicy: 'network-only',
      },
    });
    words = [...words, ...data.aggregatedWords];
  }
  await setWords(words);

  if (words) {
    setLoading(false);
  }
};

export const fetchWordsFromComplexity = async (group, page, setLoading, setWords) => {
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: AggregatedWordsComplexityDocument,
    variables: { input: { group: Number(group), page }, fetchPolicy: 'network-only' },
  });

  const words = data.aggregatedWordsComplexity;
  const result = toMatrix(words, WORDS_IN_PAGE);

  await setWords(result[page]);
  if (result) {
    setLoading(false);
  }
};

export const fetchWordsFromDeleted = async (group, page, setLoading, setWords) => {
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: AggregatedWordsDeletedDocument,
    variables: { input: { group: Number(group), page }, fetchPolicy: 'network-only' },
  });

  const words = data.aggregatedWordsDeleted;
  const result = toMatrix(words, WORDS_IN_PAGE);

  await setWords(result[page]);
  if (result) {
    setLoading(false);
  }
};

export const fetchWordsFromStudied = async (group, page, setLoading, setWords) => {
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: AggregatedWordsStudiedDocument,
    variables: { input: { group: Number(group), page }, fetchPolicy: 'network-only' },
  });

  const words = data.aggregatedWordsStudied;
  const result = toMatrix(words, WORDS_IN_PAGE);

  await setWords(result[page]);
  if (result) {
    setLoading(false);
  }
};

export const userFetchAudiocall = async (group, page, setLoading, setWords) => {
  setLoading(true);
  const apollo = initializeApollo();

  const { data } = await apollo.query({
    query: AggregatedWordsDocument,
    variables: {
      input: { group: Number(group), page },
      fetchPolicy: 'network-only',
    },
  });

  let words = [...data.aggregatedWords];
  if (words.length < 10 && page !== 0) {
    const { data } = await apollo.query({
      query: AggregatedWordsDocument,
      variables: {
        input: { group: Number(group), page: page - 1 },
        fetchPolicy: 'network-only',
      },
    });
    words = [...words, ...data.aggregatedWords];
  }
  if (words.length > 10) {
    words.splice(9, 10);
  }
  await setWords(words);

  if (words) {
    setLoading(false);
  }
};

export const getBackUpWords = async (group, page, setLoading, setAdditionalWords) => {
  setLoading(true);
  const apollo = initializeApollo();

  const { data } = await apollo.query({
    query: AggregatedWordsDocument,
    variables: {
      input: { group: Number(group), page: page + 1 },
      fetchPolicy: 'network-only',
    },
  });

  let words = [...data.aggregatedWords];
  if (words.length < 10 && page !== 0) {
    const { data } = await apollo.query({
      query: AggregatedWordsDocument,
      variables: {
        input: { group: Number(group), page: page + 2 },
        fetchPolicy: 'network-only',
      },
    });
    words = [...words, ...data.aggregatedWords];
  }
  setAdditionalWords(words);

  if (words) {
    setLoading(false);
  }
};

export const fetchUserStatistic = async () => {
  const apollo = initializeApollo();

  const { data } = await apollo.query({
    query: StatisticDocument,
    variables: {},
    fetchPolicy: 'network-only',
  });

  if (data.statistic._id) {
    return data.statistic;
  }
};

export const editGlobalStatistic = async (editStatistic, userStatistic) => {
  try {
    const {
      globalRate,
      wordsCountSprint,
      rightAnswersSprint,
      seriesSprint,
      wordsCountSavanna,
      rightAnswersSavanna,
      seriesSavanna,
      wordsCountCall,
      rightAnswersCall,
      seriesCall,
      wordsCountNew,
      rightAnswersNew,
      seriesNew,
      localRate,
      wordsCount,
      rightAnswers,
    } = userStatistic;
    const { data } = await editStatistic({
      variables: {
        input: {
          globalRate,
          wordsCountSprint,
          rightAnswersSprint,
          seriesSprint,
          wordsCountSavanna,
          rightAnswersSavanna,
          seriesSavanna,
          wordsCountCall,
          rightAnswersCall,
          seriesCall,
          wordsCountNew,
          rightAnswersNew,
          seriesNew,
          localRate,
          wordsCount,
          rightAnswers,
        },
      },
    });

    if (data) {
      return data;
    }
  } catch (err) {
    console.error(err.message);
  }
};
