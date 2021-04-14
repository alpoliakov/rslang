import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Loading from '../../../components/Loading';
import Pagination, { OnPageChangeCallback } from '../../../components/Pagination/Pagination';
import VocabularyNav from '../../../components/VocabularyNav/VocabularyNav';
import WordCard from '../../../components/WordCard/WordCard';
import { VOCABULARY_GROUP_NAV_LINKS, WORDS_IN_PAGE } from '../../../constants';
import { useAppContext } from '../../../context/ContextApp';
import { useAggregatedWordsStudiedQuery } from '../../../lib/graphql/aggregatedWordsStudied.graphql';

export default function StudiedWords({ group }) {
  const bg = useColorModeValue('gray.50', '#223c50');
  const [words, setWords] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [dimArray, setDimArray] = useState(null);

  const router = useRouter();
  const { pathname } = router;

  const { setShowLink, setVocabularyPage } = useAppContext();

  const { data, loading, refetch } = useAggregatedWordsStudiedQuery({
    variables: { input: { group } },
  });

  const searchChapter = (pathName) => {
    if (pathName.match('complex')) {
      setChapter('complex');
      return;
    }

    if (pathName.match('deleted')) {
      setChapter('deleted');
      return;
    }

    return setChapter('studied');
  };

  const toMatrix = (arr, width) =>
    arr.reduce(
      (rows, key, index) =>
        (index % width == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows,
      [],
    );

  const calcNumberPages = async (arr) => {
    const length = await arr.length;

    return setPageCount(Math.ceil(length / WORDS_IN_PAGE));
  };

  useEffect(() => {
    searchChapter(pathname);
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setDimArray(toMatrix(data.aggregatedWordsStudied, WORDS_IN_PAGE));

      calcNumberPages(data.aggregatedWordsStudied);
    }
  }, [data]);

  useEffect(() => {
    if (dimArray) {
      setWords(dimArray[currentPage]);
    }
  }, [dimArray]);

  useEffect(() => {
    setShowLink(!!words);
  }, [words]);

  useEffect(() => {
    if (words) {
      setWords(dimArray[currentPage]);
    }
    setVocabularyPage(currentPage);
  }, [currentPage]);

  const onPageChanged: OnPageChangeCallback = (selectedItem) => {
    const newPage = selectedItem.selected;
    setCurrentPage(newPage);
  };

  if (loading) {
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
        <title>Studied Words</title>
      </Head>
      <Grid templateRows="auto 1fr" gap={6} width="full" height="full">
        <Container
          maxW="container.xl"
          position="sticky"
          top={{ base: 170, lg: 120 }}
          p={1}
          height="full"
          zIndex="1"
          bg={bg}
          width="full">
          <Flex alignItems="center" justifyContent="center" borderWidth={0}>
            <Tabs defaultIndex={group} borderBottomColor="transparent" mx="auto">
              <TabList>
                {VOCABULARY_GROUP_NAV_LINKS.map((item, index) => (
                  <VocabularyNav
                    key={index + 1}
                    link={item.link}
                    pathName="studied/"
                    index={index}
                    title={item.title}
                  />
                ))}
              </TabList>
            </Tabs>
          </Flex>
        </Container>
        <Container maxW="container.xl">
          <Flex alignItems="center" justifyContent="center">
            <Heading size="lg" p={1}>
              Группа: {group + 1}
            </Heading>
          </Flex>
          <Flex p={10} w="full" alignItems="center" justifyContent="center" flexDirection="column">
            {!loading && !words && <Heading size="lg">В данной группе слова отсутствуют.</Heading>}
            {!loading &&
              words &&
              words.length > 0 &&
              words.map((word) => (
                <WordCard
                  word={word}
                  right={word.optional.rightAnswers}
                  wrong={word.optional.wrongAnswers}
                  refetch={refetch}
                  chapter={chapter}
                  key={word._id}
                />
              ))}
            {!loading && words && words.length && (
              <Box>
                <Pagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  onPageChange={onPageChanged}
                />
              </Box>
            )}
          </Flex>
        </Container>
      </Grid>
    </Flex>
  );
}

StudiedWords.getInitialProps = ({ query }) => {
  const group = +query.group;
  return {
    group,
  };
};
