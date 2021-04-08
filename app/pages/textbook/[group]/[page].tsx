import { useQuery } from '@apollo/client';
import {
  Badge,
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
import { format } from 'url';
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

export default function Pages({ group, page }) {
  const router = useRouter();
  const { pathname, query } = router;
  const { user } = useAuth();

  const [state, setState] = useState(null);
  const [loadingWords, setLoadingWords] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [audioMeaning, setAudioMeaning] = useState('');
  const [audioExample, setAudioExample] = useState('');
  const [interrupt, setInterrupt] = useState(false);
  const [pageCount, setPageCount] = useState(30);
  const [startMeaning, setStartMeaning] = useState(false);
  const [startExample, setStartExample] = useState(false);
  const [session, setSession] = useState(false);

  const [editAggregatedWord] = useEditAggregatedWordMutation();

  const {
    data: { localStatistics },
    loading,
  } = useQuery(GET_LOCAL_STATISTIC);

  const { data } = useAppContext();
  const { showTranslate, showButtons } = data;

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

  const userFetch = async () => {
    setLoadingWords(true);
    const apollo = initializeApollo();

    const { data } = await apollo.query({
      query: AggregatedWordsDocument,
      variables: {
        input: { group, page },
      },
    });

    await setState([...data.aggregatedWords]);
  };

  const nonUserFetch = async () => {
    setLoadingWords(true);
    const apollo = initializeApollo();

    const { data } = await apollo.query({
      query: WordsDocument,
      variables: { group, page },
    });

    await setState([...data.words]);
  };

  const fetchWords = async () => {
    if (user) {
      userFetch();
    }

    if (!user) {
      nonUserFetch();
    }

    setCurrentPage(page);
  };

  useEffect(() => {
    setLoadingWords(true);
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

  // const reload = () => {
  //   router.push(format({ pathname, query }));
  // };

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

      if (data.editAggregatedWord._id) {
        fetchWords();
      }
    } catch (err) {
      console.log(err);
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

    if (!user) {
      return toast.error('Данное действие недоступно. Вам необходимо войти или зарегистрироваться');
    }

    const word = await fetchCurrentWord(event.target.dataset.word);
    const { optional, complexity, deleted } = word;
    const { repeat, rightAnswers } = optional;

    const args = {
      id: event.target.dataset.word,
      repeat: repeat + 1,
      rightAnswers: rightAnswers + 1,
      studied: true,
    };

    if (event.target.dataset.name === 'deleted') {
      await editWord({
        ...args,
        deleted: true,
        complexity,
      });

      return;
    }

    if (event.target.dataset.name === 'complex') {
      await editWord({
        ...args,
        deleted,
        complexity: true,
      });

      return;
    }
  };

  useEffect(() => {
    if (Array.isArray(state) && state.length > 0) {
      setLoadingWords(false);
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
      <Flex alignItems="center" justifyContent="center">
        <Heading size="lg" p={1}>
          Group: {group + 1}
        </Heading>
      </Flex>
      <Flex p={1} px={2} w="full" alignItems="center" justifyContent="center" flexDirection="column">
        {!loadingWords &&
          state &&
          state.map((word) => {
            return (
              !word.deleted && (
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
                        backgroundImage: `url(${LOCAL_HOST}${user ? word.word.image : word.image})`,
                      }}
                    />
                  </Box>
                  <Box py={12} px={6} maxW={{ base: '2xl', lg: '5xl' }} w={{ lg: '60%' }}>
                    <Heading
                      fontSize={{ base: 'xl', md: '2xl' }}
                      color={useColorModeValue('gray.800', 'white')}
                      fontWeight="bold">
                      <Text color={useColorModeValue('brand.600', 'brand.400')}>
                        {user ? word.word.word : word.word} -{' '}
                        {user ? word.word.transcription : word.transcription}{' '}
                        {showTranslate &&
                          `- ${user ? word.word.wordTranslate : word.wordTranslate}`}
                      </Text>
                    </Heading>
                    <Box my={2}>
                      <Text
                        color={useColorModeValue('gray.600', 'gray.200')}
                        dangerouslySetInnerHTML={{
                          __html: showTranslate
                            ? `<p>${user ? word.word.textMeaning : word.textMeaning} - ${
                                user ? word.word.textMeaningTranslate : word.textMeaningTranslate
                              }</p>`
                            : `<p>${user ? word.word.textMeaning : word.textMeaning}`,
                        }}
                      />
                    </Box>
                    <Box my={2}>
                      <Text
                        color={useColorModeValue('gray.600', 'gray.200')}
                        dangerouslySetInnerHTML={{
                          __html: showTranslate
                            ? `<p>${user ? word.word.textExample : word.textExample} - ${
                                user ? word.word.textExampleTranslate : word.textExampleTranslate
                              }</p>`
                            : `<p>${user ? word.textExample : word.textExample}</p>`,
                        }}
                      />
                    </Box>
                    <Grid mt={4} w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
                      <GridItem colSpan={word.complexity ? 1 : 2}>
                        <IconButton
                          colorScheme="teal"
                          w="100%"
                          onMouseDown={() => {
                            setInterrupt(true);
                            setWordAudioUrl(LOCAL_HOST + `${user ? word.word.audio : word.audio}`);
                            setAudioMeaning(
                              LOCAL_HOST + `${user ? word.word.audioMeaning : word.audioMeaning}`,
                            );
                            setAudioExample(
                              LOCAL_HOST + `${user ? word.word.audioExample : word.audioExample}`,
                            );
                          }}
                          onClick={handleSound}
                          aria-label="Listen audio"
                          icon={<MdHeadset size="24px" />}
                        />
                      </GridItem>
                      {user ? (
                        word.complexity ? (
                          <Flex align="center" justify="center" bg="red.100" borderRadius={5}>
                            <Badge size="2xl" colorScheme="red">
                              cложное
                            </Badge>
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
                            disabled={user ? word.complexity : ''}
                            data-word={user ? word._id : ''}
                            data-name="complex"
                            onClick={handleButtons}>
                            Сложное слово
                          </Button>
                          <Button
                            data-word={user ? word._id : ''}
                            data-name="deleted"
                            onClick={handleButtons}>
                            Удалить слово
                          </Button>
                        </>
                      )}
                    </Grid>
                  </Box>
                </Box>
              )
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
