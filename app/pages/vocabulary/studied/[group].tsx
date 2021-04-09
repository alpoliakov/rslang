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
import { useAggregatedWordsStudiedQuery } from '../../../lib/graphql/aggregatedWordsStudied.graphql';
import { useAuth } from '../../../lib/useAuth';

export default function StudiedWords({ group }) {
  const bg = useColorModeValue('gray.50', '#223c50');
  const [words, setWords] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [dimArray, setDimArray] = useState(null);

  const router = useRouter();
  const { pathname } = router;

  const { data, loading, refetch } = useAggregatedWordsStudiedQuery({
    variables: { input: { group } },
  });

  console.log(data);

  const searchChapter = () => {
    if (pathname.match('complex')) {
      setChapter('complex');
      return;
    }

    if (pathname.match('deleted')) {
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
    console.log('Array length - ', length);

    if (length <= WORDS_IN_PAGE) {
      return;
    }

    return setPageCount(Math.ceil(arr.length / 20));
  };

  useEffect(() => {
    searchChapter();
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setWords(toMatrix(data.aggregatedWordsStudied, 20)[currentPage]);
      calcNumberPages(data.aggregatedWordsStudied);
    }
  }, [data]);

  useEffect(() => {
    if (words) {
      setWords(dimArray[currentPage]);
    }
  }, [currentPage]);

  const onPageChanged: OnPageChangeCallback = (selectedItem) => {
    const newPage = selectedItem.selected;
    setCurrentPage(newPage);
  };

  if (loading) {
    return <Loading />;
  }

  console.log(dimArray);

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
          top="123px"
          p={1}
          height="full"
          bg={bg}
          zIndex="10"
          width="full">
          <Flex alignItems="center" justifyContent="space-between" borderWidth={0}>
            <Tabs defaultIndex={group} borderBottomColor="transparent">
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
              Group: {group + 1}
            </Heading>
          </Flex>
          <Flex p={10} w="full" alignItems="center" justifyContent="center" flexDirection="column">
            {!loading && words && words.length === 0 && (
              <Heading size="lg">В данной группе слова отсутствуют.</Heading>
            )}
            {!loading &&
              words &&
              words.length > 0 &&
              words.map((word) => <WordCard word={word} chapter={chapter} key={word._id} />)}
            {!loading && words && words.length > 1 && (
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
