import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdHeadset } from 'react-icons/md';
import useSound from 'use-sound';

import Loading from '../../../components/Loading';
import Pagination, { OnPageChangeCallback } from '../../../components/Pagination/Pagination';
import { LOCAL_HOST } from '../../../constants';
import { useAppContext } from '../../../context/ContextApp';
import EditLocalStatistics from '../../../context/statistic/operations/mutations/editStatistics';
import { GET_LOCAL_STATISTIC } from '../../../context/statistic/operations/queries/getLocalStatistic';
import { initializeApollo } from '../../../lib/apollo';
import { AggregatedWordDocument } from '../../../lib/graphql/aggregatedWord.graphql';
import { AggregatedWordsDocument } from '../../../lib/graphql/aggregatedWords.graphql';
import { useEditAggregatedWordMutation } from '../../../lib/graphql/editAggregatedWord.graphql';
import { WordsDocument } from '../../../lib/graphql/words.graphql';
import { useAuth } from '../../../lib/useAuth';
import { nonAuthUserStatistic } from '../../../utils/processingUserLocalStatistic';

export default function Pages({ group, page }) {
  const router = useRouter();
  const { user } = useAuth();

  const [state, setState] = useState(null);
  const [loadingWords, setLoadingWords] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [audioMeaning, setAudioMeaning] = useState('');
  const [audioExample, setAudioExample] = useState('');
  const [interrupt, setInterrupt] = useState(false);
  const [pageCount, setPageCount] = useState(null);
  const [startMeaning, setStartMeaning] = useState(false);
  const [startExample, setStartExample] = useState(false);
  const [session, setSession] = useState(false);
  const [localState, setLocalState] = useState(null);
  const [wordsUsed, setWordsUsed] = useState(null);
  const [rightAnswers, setRightAnswers] = useState(null);
  const [currentUser, setCurrentUser] = useState(user);

  const [editAggregatedWord] = useEditAggregatedWordMutation();

  const { data, setShowLink } = useAppContext();
  const { showTranslate, showButtons } = data;

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const {
    data: { localStatistics },
  } = useQuery(GET_LOCAL_STATISTIC);

  const [playExample, objPlayExample] = useSound(audioExample, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onend: () => setStartExample(false),
  });
  const [playMeaning, objPlayMeaning] = useSound(audioMeaning, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onend: () => {
      setStartMeaning(false);
      setStartExample(true);
    },
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [playWord, objPlayWord] = useSound(wordAudioUrl, { onend: () => setStartMeaning(true) });

  const userFetchCache = async () => {
    setLoadingWords(true);

    const apollo = initializeApollo();

    const { data } = await apollo.query({
      query: AggregatedWordsDocument,
      variables: {
        input: { group, page },
      },
      fetchPolicy: 'cache-first',
    });

    await setState(data.aggregatedWords);
  };

  const userFetch = async () => {
    setLoadingWords(true);

    const apollo = initializeApollo();

    const { data } = await apollo.query({
      query: AggregatedWordsDocument,
      variables: {
        input: { group, page },
      },
      fetchPolicy: 'network-only',
    });

    return data.aggregatedWords;
  };

  const nonUserFetch = async () => {
    setLoadingWords(true);
    const apollo = initializeApollo();

    const { data } = await apollo.query({
      query: WordsDocument,
      variables: { group, page },
    });

    return data.words;
  };

  const fetchWords = async () => {
    if (currentUser) {
      userFetch().then((data) => setState(data));
    }

    if (!currentUser) {
      nonUserFetch().then((data) => setState(data));
    }

    setCurrentPage(page);
  };

  useEffect(() => {
    setLoadingWords(true);
    setLocalState(nonAuthUserStatistic('localStatistic', localStatistics));
    setPageCount(30);
    setShowLink(true);

    setTimeout(() => {
      setSession(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (session) {
      fetchWords();
      setSession(false);
    }
  }, [session]);

  useEffect(() => {
    if (startMeaning) {
      playMeaning();
    }

    if (startExample) {
      playExample();
    }

    if (interrupt) {
      objPlayWord.stop();
      objPlayMeaning.stop();
      objPlayExample.stop();
      setStartMeaning(false);
      setStartExample(false);
    }
  }, [startMeaning, startExample, interrupt]);

  const handleSound = () => {
    setInterrupt(false);

    setTimeout(() => {
      playWord();
    }, 100);
  };

  const setJumpToPage = (newPage) => {
    setInterrupt(true);
    const href = `/textbook/${group}/${newPage}`;
    router.push(href, href);
  };

  const onPageChanged: OnPageChangeCallback = (selectedItem) => {
    const newPage = selectedItem.selected;
    setJumpToPage(newPage);
  };

  const editWord = async ({ id, complexity, deleted, repeat, rightAnswers, studied }) => {
    try {
      const { data } = await editAggregatedWord({
        variables: { input: { id, complexity, deleted, repeat, rightAnswers, studied } },
      });

      if (data.editAggregatedWord._id && complexity) {
        userFetchCache();
      }

      if (data.editAggregatedWord._id && deleted) {
        fetchWords();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCurrentWord = async (id) => {
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
      console.error(err.message);
    }
  };

  const handleButtons = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      return toast.error('???????????? ???????????????? ????????????????????. ?????? ???????????????????? ?????????? ?????? ????????????????????????????????????');
    }

    const word = await fetchCurrentWord(event.target.dataset.word);
    const { optional, complexity, deleted, studied } = word;
    const { repeat, rightAnswers } = optional;

    const args = {
      id: event.target.dataset.word,
    };

    if (event.target.dataset.name === 'deleted') {
      await editWord({
        ...args,
        deleted: true,
        studied: false,
        complexity,
        repeat,
        rightAnswers,
      });

      return;
    }

    if (event.target.dataset.name === 'complex') {
      await editWord({
        ...args,
        deleted,
        studied: true,
        complexity: true,
        repeat: repeat + 1,
        rightAnswers: rightAnswers + 1,
      });

      localState.wordsCount = localState.wordsCount + 1;
      setLocalState(localState);
      EditLocalStatistics(localState);

      return;
    }
  };

  const setPageStatistic = () => {
    let words = 0;
    let right = 0;

    state.forEach((item) => {
      words = words + item.optional.repeat;
      right = right + item.optional.rightAnswers;
    });

    setWordsUsed(words);
    setRightAnswers(right);
  };

  useEffect(() => {
    if (Array.isArray(state) && state.length >= 0) {
      setLoadingWords(false);
    }

    if (currentUser && state) {
      setPageStatistic();

      if (state.length === 0) {
        if (page === pageCount - 1) {
          router.push(`/textbook/${group}/${page - 1}`);
          return;
        }

        router.push(`/textbook/${group}/${page + 1}`);
        return;
      }
    }
  }, [state]);

  if (loadingWords) {
    return <Loading />;
  }

  return (
    <Flex
      width="full"
      height="full"
      alignItems="center"
      justifyContent="center"
      flexDirection="column">
      <Head>
        <title>Textbook</title>
      </Head>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Heading size="lg" p={1}>
          ????????????: {group + 1}
        </Heading>
        <Heading size="md" p={1}>
          ????????????????: {page + 1}
        </Heading>
        {currentUser && (
          <Text size="sm" fontWeight="bold">
            ???????????????????????? - {wordsUsed} : ???????????????????? ???????????? - {rightAnswers}
          </Text>
        )}
      </Flex>
      <Flex p={10} w="full" alignItems="center" justifyContent="center" flexDirection="column">
        {!loadingWords &&
          state &&
          state.map((word) => {
            return (
              <Box
                bg={useColorModeValue('white', 'gray.800')}
                mx={{ lg: 8 }}
                my={4}
                key={word._id}
                display={{ lg: 'flex' }}
                w="full"
                maxW={{ lg: '5xl' }}
                shadow={{ lg: 'lg' }}
                rounded={{ lg: 'lg' }}>
                <Box w={{ lg: '40%' }}>
                  <Box
                    h={{ base: 64, lg: 'full' }}
                    rounded={{ lg: 'lg' }}
                    bgSize="cover"
                    bgPosition="center"
                    style={{
                      backgroundImage: `url(${LOCAL_HOST}${
                        currentUser ? word.word.image : word.image
                      })`,
                    }}
                  />
                </Box>
                <Box py={12} px={6} maxW={{ base: 'xl', lg: '5xl' }} w={{ lg: '60%' }}>
                  <Heading
                    fontSize={{ base: 'xl', md: '2xl' }}
                    color={useColorModeValue('gray.800', 'white')}
                    fontWeight="bold">
                    <Text color={useColorModeValue('brand.600', 'brand.400')}>
                      {currentUser ? word.word.word : word.word} -{' '}
                      {currentUser ? word.word.transcription : word.transcription}{' '}
                      {showTranslate &&
                        `- ${currentUser ? word.word.wordTranslate : word.wordTranslate}`}
                    </Text>
                  </Heading>
                  <Box my={2}>
                    <Text
                      color={useColorModeValue('gray.600', 'gray.200')}
                      dangerouslySetInnerHTML={{
                        __html: showTranslate
                          ? `<p>${currentUser ? word.word.textMeaning : word.textMeaning} - ${
                              currentUser
                                ? word.word.textMeaningTranslate
                                : word.textMeaningTranslate
                            }</p>`
                          : `<p>${currentUser ? word.word.textMeaning : word.textMeaning}`,
                      }}
                    />
                  </Box>
                  <Box my={2}>
                    <Text
                      color={useColorModeValue('gray.600', 'gray.200')}
                      dangerouslySetInnerHTML={{
                        __html: showTranslate
                          ? `<p>${currentUser ? word.word.textExample : word.textExample} - ${
                              currentUser
                                ? word.word.textExampleTranslate
                                : word.textExampleTranslate
                            }</p>`
                          : `<p>${currentUser ? word.word.textExample : word.textExample}</p>`,
                      }}
                    />
                  </Box>
                  <Grid mt={4} w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
                    <GridItem colSpan={word.complexity ? 1 : 2}>
                      <IconButton
                        w="100%"
                        colorScheme="teal"
                        onMouseDown={() => {
                          setInterrupt(true);
                          setWordAudioUrl(
                            LOCAL_HOST + `${currentUser ? word.word.audio : word.audio}`,
                          );
                          setAudioMeaning(
                            LOCAL_HOST +
                              `${currentUser ? word.word.audioMeaning : word.audioMeaning}`,
                          );
                          setAudioExample(
                            LOCAL_HOST +
                              `${currentUser ? word.word.audioExample : word.audioExample}`,
                          );
                        }}
                        onClick={handleSound}
                        aria-label="Listen audio"
                        icon={<MdHeadset size="24px" />}
                      />
                    </GridItem>
                    {currentUser ? (
                      word.complexity ? (
                        <Flex align="center" justify="center" bg="red.100" borderRadius={5}>
                          <Text style={{ textTransform: 'uppercase' }} color="red.500">
                            c????????????
                          </Text>
                        </Flex>
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                    {showButtons && (
                      <>
                        <Button
                          disabled={currentUser ? word.complexity : ''}
                          data-word={currentUser ? word._id : ''}
                          data-name="complex"
                          onClick={handleButtons}>
                          ?????????????? ??????????
                        </Button>
                        <Button
                          data-word={currentUser ? word._id : ''}
                          data-name="deleted"
                          onClick={handleButtons}>
                          ?????????????? ??????????
                        </Button>
                      </>
                    )}
                  </Grid>
                  {currentUser && word.optional && (
                    <Box mt={4}>
                      <Text size="sm" fontWeight="bold">
                        ????????????????????????: {word.optional.repeat}. ???????????????????? ??????????????:{' '}
                        {word.optional.rightAnswers}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
      </Flex>
      <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={onPageChanged} />
    </Flex>
  );
}

Pages.getInitialProps = async ({ query }) => {
  const group = +query.group;
  const page = +query.page || 0;

  return {
    group,
    page,
  };
};
