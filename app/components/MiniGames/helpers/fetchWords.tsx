import { initializeApollo } from '../../../lib/apollo';
import { AggregatedWordDocument } from '../../../lib/graphql/aggregatedWord.graphql';
import { AggregatedWordsDocument } from '../../../lib/graphql/aggregatedWords.graphql';
import { WordsDocument } from '../../../lib/graphql/words.graphql';

export const fetchCurrentWords = async (group, page, setLoading, setWords) => {
  console.log('inside fetchCurrentWords', group, group === '', typeof group);
  console.log(`group: ${group}, page: ${page}`);
  if (group === '') return;
  console.log('here fetchCurrentWords');
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: WordsDocument,
    variables: { group: Number(group), page },
  });

  const words = [...data.words];
  setWords([...data.words]);
  console.log(words);
  if (words) {
    setLoading(false);
  }
};

export const fetchCurrentWordsAudiocall = async (
  group,
  page,
  setLoading,
  setWords,
  setCurrentPage,
) => {
  console.log('inside fetchCurrentWordsAudiocall', group === '');
  if (group === '') return;
  console.log('here fetchCurrentWords');
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: WordsDocument,
    variables: { group: Number(group), page },
  });

  const words = [...data.words];
  setWords(words.splice(9, 10));
  console.log(words);
  if (words) {
    setLoading(false);
  }
  if (setCurrentPage) {
    setCurrentPage(page + 1);
  }
};

export const fetchCurrentWord = async (id) => {
  const apollo = initializeApollo();
  try {
    const { data } = await apollo.query({
      query: AggregatedWordDocument,
      variables: { aggregatedWordId: id },
    });

    if (data.aggregatedWord._id) {
      return data.aggregatedWord;
    }
  } catch (err) {
    console.error(err.message, 'error in fetchWord');
  }
};

export const editWord = async (
  { id, repeat, rightAnswers, studied },
  complexity,
  deleted,
  editAggregatedWord,
  fetchWords,
) => {
  try {
    const { data } = await editAggregatedWord({
      variables: { input: { id, complexity, deleted, repeat, rightAnswers, studied } },
    });

    console.log(data, 'data in editword');

    // if (data.editAggregatedWord._id) {
    //   fetchWords();
    // }
  } catch (err) {
    console.log(err);
  }
};

export const userFetch = async (group, page, setLoading, setWords) => {
  setLoading(true);
  const apollo = initializeApollo();

  const { data } = await apollo.query({
    query: AggregatedWordsDocument,
    variables: {
      input: { group: Number(group), page },
    },
  });
  const words = [...data.aggregatedWords];

  await setWords([...data.aggregatedWords]);

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
    },
  });

  const words = [...data.aggregatedWords];
  await setWords(words.splice(9, 10));

  if (words) {
    setLoading(false);
  }
};
