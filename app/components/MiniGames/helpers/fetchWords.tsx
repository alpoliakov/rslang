import { initializeApollo } from '../../../lib/apollo';
import { WordsDocument } from '../../../lib/graphql/words.graphql';

export const fetchCurrentWords = async (group, page, setLoading, setWords, setCurrentPage) => {
  console.log('inside fetchCurrentWords', group, group === '', typeof group);
  if (group === '') return;
  console.log('here fetchCurrentWords');
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: WordsDocument,
    variables: { group: Number(group), page },
  });
  console.log('here fetchCurrentWords');

  const words = [...data.words];
  setWords([...data.words]);
  console.log(words);
  if (words) {
    setLoading(false);
  }
  if (setCurrentPage) {
    setCurrentPage(page + 1);
  }
  // console.log('const words', words[0].word, words[0].wordTranslate);
  // return words;
};

export const fetchCurrentWordsAudiocall = async (group, page, setLoading, setWords) => {
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: WordsDocument,
    variables: { group, page },
  });

  const words = [...data.words];
  setWords(words.splice(9, 10));
  console.log(words);
  if (words) {
    setLoading(false);
  }
  // setCurrentPage(page);
  // console.log('const words', words[0].word, words[0].wordTranslate);
  // return words;
};
