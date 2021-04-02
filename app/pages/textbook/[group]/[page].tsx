import { useQuery } from '@apollo/client';
import {
  Badge,
  Box,
  Button,
  Flex,
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
import { AggregatedWordsDocument } from '../../../lib/graphql/aggregatedWords.graphql';
import { useAggregatedWordsQuery } from '../../../lib/graphql/aggregatedWords.graphql';
import { WordsDocument } from '../../../lib/graphql/words.graphql';
import { useAuth } from '../../../lib/useAuth';

export default function Pages({ group, page }) {
  const router = useRouter();
  const { pathname, query } = router;
  const [state, setState] = useState([]);
  const [loadingWords, setLoadingWords] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [audioMeaning, setAudioMeaning] = useState('');
  const [audioExample, setAudioExample] = useState('');
  const [interrupt, setInterrupt] = useState(false);
  const [pageCount, setPageCount] = useState(30);
  const [startMeaning, setStartMeaning] = useState(false);
  const [startExample, setStartExample] = useState(false);

  // const { data: gapst } = useAggregatedWordsQuery({
  //   variables: {
  //     input: { group, page },
  //   },
  // });

  const {
    data: { localStatistics },
    loading,
  } = useQuery(GET_LOCAL_STATISTIC);

  const { data } = useAppContext();
  const { showTranslate, showButtons } = data;

  const { user } = useAuth();

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

  const fetchWords = async () => {
    setLoadingWords(true);
    const apollo = initializeApollo();

    if (user) {
      const { data } = await apollo.query({
        query: AggregatedWordsDocument,
        variables: {
          input: { group, page },
        },
      });

      const arr = [];

      data.aggregatedWords.forEach((word) => {
        arr.push(word.word);
      });

      await setState([...arr]);
    }

    if (!user) {
      const { data } = await apollo.query({
        query: WordsDocument,
        variables: { group, page },
      });

      await setState([...data.words]);
    }

    await setCurrentPage(page);

    setLoadingWords(false);
  };

  useEffect(() => {
    fetchWords();
  }, []);

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

  const handleComplexWordBtn = () => {
    if (!user) {
      return toast.error('Данное действие недоступно. Вам необходимо войти или зарегистрироваться');
    }
  };

  const handleDeleteWordBtn = () => {
    if (!user) {
      return toast.error('Данное действие недоступно. Вам необходимо войти или зарегистрироваться');
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

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
      <Flex p={10} w="full" alignItems="center" justifyContent="center" flexDirection="column">
        {loadingWords && <Loading />}
        {!loadingWords &&
          state &&
          state.map((word) => (
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
                    backgroundImage: `url(${LOCAL_HOST}${word.image})`,
                  }}
                />
              </Box>
              <Box py={12} px={6} maxW={{ base: 'xl', lg: '5xl' }} w={{ lg: '60%' }}>
                <Heading
                  fontSize={{ base: 'xl', md: '2xl' }}
                  color={useColorModeValue('gray.800', 'white')}
                  fontWeight="bold">
                  <Text color={useColorModeValue('brand.600', 'brand.400')}>
                    {word.word} - {word.transcription} {showTranslate && `- ${word.wordTranslate}`}
                  </Text>
                </Heading>
                <Box my={2}>
                  <Text
                    color={useColorModeValue('gray.600', 'gray.200')}
                    dangerouslySetInnerHTML={{
                      __html: showTranslate
                        ? `<p>${word.textMeaning} - ${word.textMeaningTranslate}</p>`
                        : `<p>${word.textMeaning}`,
                    }}
                  />
                </Box>
                <Box my={2}>
                  <Text
                    color={useColorModeValue('gray.600', 'gray.200')}
                    dangerouslySetInnerHTML={{
                      __html: showTranslate
                        ? `<p>${word.textExample} - ${word.textExampleTranslate}</p>`
                        : `<p>${word.textExample}</p>`,
                    }}
                  />
                </Box>
                <Flex mt={4} w="full" alignItems="center" justifyContent="space-between">
                  <IconButton
                    colorScheme="teal"
                    onMouseDown={() => {
                      setInterrupt(true);
                      setWordAudioUrl(LOCAL_HOST + word.audio);
                      setAudioMeaning(LOCAL_HOST + word.audioMeaning);
                      setAudioExample(LOCAL_HOST + word.audioExample);
                    }}
                    onClick={handleSound}
                    aria-label="Listen audio"
                    icon={<MdHeadset size="24px" />}
                  />
                  <Badge fontSize="0.9em" colorScheme="red">
                    cложное
                  </Badge>
                  {showButtons && (
                    <Flex alignItems="center" justifyContent="space-between">
                      <Button mr={3} onClick={handleComplexWordBtn}>
                        Сложное слово
                      </Button>
                      <Button onClick={handleDeleteWordBtn}>Удалить слово</Button>
                    </Flex>
                  )}
                </Flex>
              </Box>
            </Box>
          ))}
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
