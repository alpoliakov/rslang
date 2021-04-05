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
import VocabularyNav from '../../../components/VocabularyNav/VocabularyNav';
import WordCard from '../../../components/WordCard/WordCard';
import { VOCABULARY_GROUP_NAV_LINKS, WORDS_IN_PAGE } from '../../../constants';
import { useAggregatedWordsDeletedQuery } from '../../../lib/graphql/aggregatedWordsDeleted.graphql';

export default function DeletedWords({ group }) {
  const bg = useColorModeValue('gray.50', '#223c50');
  const [words, setWords] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [chapter, setChapter] = useState(null);
  const [pageCount, setPageCount] = useState(0);

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

  const calcNumberPages = async (arr) => {
    const length = await arr.length;
    console.log('Array length - ', length);

    if (length <= WORDS_IN_PAGE) {
      return;
    }

    return setPageCount(Math.ceil(arr.length / 20));
  };

  console.log(group);

  useEffect(() => {
    refetch();
    searchChapter();
  }, []);

  useEffect(() => {
    if (data) {
      setWords(data.aggregatedWordsDeleted);
      calcNumberPages(data.aggregatedWordsDeleted);
    }
  }, [data]);

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
          top="110"
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
            {!loadingData && words && words.length === 0 && (
              <Heading size="lg">В данной группе слов нет.</Heading>
            )}
            {!loadingData &&
              words &&
              words.length > 0 &&
              words.map((word) => <WordCard word={word} chapter={chapter} key={word._id} />)}
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
