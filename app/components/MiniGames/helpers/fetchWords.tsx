import { initializeApollo } from '../../../lib/apollo';
import { AggregatedWordDocument } from '../../../lib/graphql/aggregatedWord.graphql';
import { AggregatedWordsDocument } from '../../../lib/graphql/aggregatedWords.graphql';
import { WordsDocument } from '../../../lib/graphql/words.graphql';

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
      fetchPolicy: 'network-only',
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
  await setWords(words.splice(9, 10));

  if (words) {
    setLoading(false);
  }
};
