import { initializeApollo } from '../../../lib/apollo';
import { WordsDocument } from '../../../lib/graphql/words.graphql';
import { AggregatedWordDocument } from '../../../lib/graphql/aggregatedWord.graphql';
import { useEditAggregatedWordMutation } from '../../../lib/graphql/editAggregatedWord.graphql';

// const [editAggregatedWord] = useEditAggregatedWordMutation();

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
  // console.log('const words', words[0].word, words[0].wordTranslate);
  // return words;
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
  } // console.log('const words', words[0].word, words[0].wordTranslate);
  // return words;
};

export const fetchCurrentWord = async (id) => {
  console.log('start of the fetchCurrentWord');
  const apollo = initializeApollo();
  try {
    console.log('inside try fetchCurrentWord');
    const { data } = await apollo.query({
      query: AggregatedWordDocument,
      variables: { aggregatedWordId: id },
    });

    const words = [...data.word];
    console.log(words, '[...data.word] inside func');
    console.log(data.aggregatedWord, 'data.aggregatedWord inside func');

    if (data.aggregatedWord._id) {
      return data.aggregatedWord;
    }
  } catch (err) {
    console.error(err.message, 'error in fetchWord');
  }
};

export const editWord = async ({ id, complexity, deleted, repeat, rightAnswers, studied }) => {
  const [editAggregatedWord] = useEditAggregatedWordMutation();

  try {
    const { data } = await editAggregatedWord({
      variables: { input: { id, complexity, deleted, repeat, rightAnswers, studied } },
    });

    // if (data.editAggregatedWord._id) {
    //   fetchWords();
    // }
  } catch (err) {
    console.log(err);
  }
};
