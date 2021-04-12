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
import { useAggregatedWordsDeletedQuery } from '../../../lib/graphql/aggregatedWordsDeleted.graphql';

export default function DeletedWords({ group }) {
  const bg = useColorModeValue('gray.50', '#223c50');
  const [words, setWords] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { setShowLink, setVocabularyPage } = useAppContext();

  const router = useRouter();
  const { pathname } = router;

  const { data, loading, refetch } = useAggregatedWordsDeletedQuery({
    variables: { input: { group } },
  });

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

    return setPageCount(Math.ceil(length / WORDS_IN_PAGE));
  };

  useEffect(() => {
    refetch();
    searchChapter();
  }, []);

  useEffect(() => {
    if (data) {
      setWords(toMatrix(data.aggregatedWordsDeleted, WORDS_IN_PAGE)[currentPage]);
      calcNumberPages(data.aggregatedWordsDeleted);
    }
  }, [data]);

  useEffect(() => {
    setShowLink(!!words);
  }, [words]);

  useEffect(() => {
    if (words) {
      console.log(words);
      setWords(toMatrix(data.aggregatedWordsDeleted, WORDS_IN_PAGE)[currentPage]);
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
        <title>Deleted Words</title>
      </Head>
      <Grid templateRows="auto 1fr" gap={6} width="full" height="full">
        <Container
          maxW="container.xl"
          position="sticky"
          top={{ base: 170, lg: 120 }}
          p={1}
          height="full"
          bg={bg}
          zIndex="1"
          width="full">
          <Flex alignItems="center" justifyContent="space-between" borderWidth={0}>
            <Tabs defaultIndex={group} borderBottomColor="transparent" mx="auto">
              <TabList>
                {VOCABULARY_GROUP_NAV_LINKS.map((item, index) => (
                  <VocabularyNav
                    key={index + 1}
                    link={item.link}
                    pathName="deleted/"
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
            {!loading && !words && <Heading size="lg">В данной группе слов нет.</Heading>}
            {!loading &&
              words &&
              words.length > 0 &&
              words.map((word) => (
                <WordCard word={word} refetch={refetch} chapter={chapter} key={word._id} />
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

DeletedWords.getInitialProps = ({ query }) => {
  const group = +query.group;

  return { group };
};
